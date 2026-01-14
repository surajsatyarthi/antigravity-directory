import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/payments/razorpay/webhook/route';
import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { payments, resources } from '@/drizzle/schema';
import crypto from 'crypto';

// Mock external dependencies
vi.mock('@/lib/db', () => ({
  db: {
    update: vi.fn(),
    query: {
      payments: {
        findFirst: vi.fn()
      }
    }
  }
}));

// Mock schema
vi.mock('@/drizzle/schema', () => ({
  payments: { id: 'payments_id', status: 'payments_status', transactionId: 'transaction_id' },
  resources: { id: 'resources_id', featured: 'featured' }
}));

describe('POST /api/payments/razorpay/webhook', () => {
  const secret = 'test_secret';
  
  beforeEach(() => {
    vi.resetAllMocks();
    process.env.RAZORPAY_KEY_SECRET = secret;
    
    // Default DB mock implementations
    vi.mocked(db.update).mockReturnValue({
      set: vi.fn().mockReturnValue({
        where: vi.fn().mockResolvedValue({})
      })
    } as any);

    vi.mocked(db.query.payments.findFirst).mockResolvedValue({
      id: 'pay_123',
      resourceId: 'res_123',
      status: 'PENDING'
    } as any);
  });

  const generateSignature = (payload: string, secret: string) => {
    return crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
  };

  // HAPPY PATH: Acceptance Criterion "Verifies HMAC signature and updates payment status"
  describe('Happy Path', () => {
    it('should verify valid signature and update database', async () => {
      const payload = JSON.stringify({
        event: 'order.paid',
        payload: {
          payment: {
            entity: {
              order_id: 'order_123',
              status: 'captured'
            }
          }
        }
      });

      const signature = generateSignature(payload, secret);

      const req = new NextRequest('http://localhost/api/payments/razorpay/webhook', {
        method: 'POST',
        headers: {
          'x-razorpay-signature': signature
        },
        body: payload
      });

      const response = await POST(req);
      expect(response.status).toBe(200);

      // Verify DB updates
      expect(db.update).toHaveBeenCalled();
    });
  });

  // SECURITY: Acceptance Criterion "Validates signature using RAZORPAY_KEY_SECRET"
  describe('Security Checks', () => {
    it('should reject invalid HMAC signature', async () => {
      const payload = JSON.stringify({ event: 'order.paid' });
      const invalidSignature = 'invalid_sig';

      const req = new NextRequest('http://localhost/api/payments/razorpay/webhook', {
        method: 'POST',
        headers: {
          'x-razorpay-signature': invalidSignature
        },
        body: payload
      });

      const response = await POST(req);
      expect(response.status).toBe(400);
      
      const data = await response.json();
      expect(data.error).toContain('Invalid signature');
    });

    it('should return 400 for missing signature header', async () => {
      const req = new NextRequest('http://localhost/api/payments/razorpay/webhook', {
        method: 'POST',
        body: JSON.stringify({ event: 'order.paid' })
      });

      const response = await POST(req);
      expect(response.status).toBe(400);
    });
  });

  // SECURITY: Acceptance Criterion "Prevents replay attacks"
  describe('Replay Prevention', () => {
    it('should ignore webhook if payment is already processed', async () => {
      vi.mocked(db.query.payments.findFirst).mockResolvedValue({
        id: 'pay_123',
        status: 'SUCCEEDED'
      } as any);

      const payload = JSON.stringify({
        event: 'order.paid',
        payload: { payment: { entity: { order_id: 'order_123' } } }
      });
      const signature = generateSignature(payload, secret);

      const req = new NextRequest('http://localhost/api/payments/razorpay/webhook', {
        method: 'POST',
        headers: { 'x-razorpay-signature': signature },
        body: payload
      });

      const response = await POST(req);
      expect(response.status).toBe(200); // Usually webhooks return 200 even if ignored to stop retries

      const data = await response.json();
      expect(data.message).toContain('already processed');
      
      // Should NOT update anything
      expect(db.update).not.toHaveBeenCalled();
    });
  });
});
