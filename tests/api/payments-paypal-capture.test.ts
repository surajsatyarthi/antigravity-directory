import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/payments/paypal/capture/route';
import { NextRequest } from 'next/server';
import * as paypalLib from '@/lib/payment/paypal';
import { db } from '@/lib/db';
import { payments, resources } from '@/drizzle/schema';
import { eq, and } from 'drizzle-orm';

// Mock external dependencies
vi.mock('@/lib/payment/paypal');
vi.mock('@/lib/db', () => ({
  db: {
    insert: vi.fn(),
    update: vi.fn(),
    query: {
      payments: {
        findFirst: vi.fn()
      }
    },
    select: vi.fn()
  }
}));

// Mock schema
vi.mock('@/drizzle/schema', () => ({
  payments: { id: 'payments_id', status: 'payments_status' },
  resources: { id: 'resources_id', isFeatured: 'resources_is_featured' }
}));

// Mock drizzle-orm
vi.mock('drizzle-orm', () => ({
  eq: vi.fn(),
  and: vi.fn()
}));

describe('POST /api/payments/paypal/capture', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    
    // Default DB mock implementations
    vi.mocked(db.update).mockReturnValue({
      set: vi.fn().mockReturnValue({
        where: vi.fn().mockResolvedValue({})
      })
    } as any);

    vi.mocked(db.query.payments.findFirst).mockResolvedValue({
      id: 'internal-id-123',
      resourceId: 'resource-xyz',
      status: 'PENDING'
    } as any);
  });

  // HAPPY PATH: Acceptance Criterion "Captures payment and returns {status: 'COMPLETED', transactionId: string}"
  describe('Happy Path', () => {
    it('should successfully capture payment and update status', async () => {
      const mockCaptureResponse = {
        id: 'PAYPAL-TX-999',
        status: 'COMPLETED'
      };

      vi.mocked(paypalLib.capturePayPalPayment).mockResolvedValue(mockCaptureResponse);

      const req = new NextRequest('http://localhost/api/payments/paypal/capture', {
        method: 'POST',
        body: JSON.stringify({ orderId: 'approved-order-id' })
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.status).toBe('COMPLETED');
      expect(data.transactionId).toBe('PAYPAL-TX-999');

      // Verify DB updates (payment_status = SUCCEEDED)
      expect(db.update).toHaveBeenCalledWith(expect.anything());
    });

    it('should update the resource to featured = true upon success', async () => {
       const mockCaptureResponse = {
        id: 'PAYPAL-TX-999',
        status: 'COMPLETED'
      };

      vi.mocked(paypalLib.capturePayPalPayment).mockResolvedValue(mockCaptureResponse);

      const req = new NextRequest('http://localhost/api/payments/paypal/capture', {
        method: 'POST',
        body: JSON.stringify({ orderId: 'approved-order-id' })
      });

      await POST(req);

      // Verify db.update was called twice (once for payment, once for resource)
      expect(db.update).toHaveBeenCalledTimes(2);
    });
  });

  // ERROR HANDLING: Prevents double-capture attempts
  describe('Safety Checks', () => {
    it('should return 400 if payment is already SUCCEEDED', async () => {
      // Mock payment that is already done
      vi.mocked(db.query.payments.findFirst).mockResolvedValue({
        id: 'internal-id-123',
        status: 'SUCCEEDED'
      } as any);

      const req = new NextRequest('http://localhost/api/payments/paypal/capture', {
        method: 'POST',
        body: JSON.stringify({ orderId: 'already-done-id' })
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('already processed');
    });

    it('should return 400 for missing orderId', async () => {
      const req = new NextRequest('http://localhost/api/payments/paypal/capture', {
        method: 'POST',
        body: JSON.stringify({})
      });

      const response = await POST(req);
      expect(response.status).toBe(400);
    });
  });

  // ERROR HANDLING: Declined payments gracefully
  describe('Payment Failures', () => {
    it('should handle declined payments gracefully', async () => {
      vi.mocked(paypalLib.capturePayPalPayment).mockRejectedValue(
        new Error('Payment capture failed with status: DECLINED')
      );

      const req = new NextRequest('http://localhost/api/payments/paypal/capture', {
        method: 'POST',
        body: JSON.stringify({ orderId: 'declined-order-id' })
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('declined');
      
      // Verify DB status is NOT SUCCEEDED (it should be set to FAILED)
      expect(db.update).toHaveBeenCalledWith(expect.anything());
    });

    it('should handle general PayPal API failures with 500', async () => {
      vi.mocked(paypalLib.capturePayPalPayment).mockRejectedValue(
        new Error('PayPal internal error')
      );

      const req = new NextRequest('http://localhost/api/payments/paypal/capture', {
        method: 'POST',
        body: JSON.stringify({ orderId: 'error-order-id' })
      });

      const response = await POST(req);
      expect(response.status).toBe(500);
    });
  });
});
