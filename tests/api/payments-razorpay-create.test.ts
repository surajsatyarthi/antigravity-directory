import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/payments/razorpay/create/route';
import { NextRequest } from 'next/server';
import * as razorpayLib from '@/lib/payment/razorpay';
import { db } from '@/lib/db';
import { payments } from '@/drizzle/schema';

// Mock external dependencies
vi.mock('@/lib/payment/razorpay');
vi.mock('@/lib/db', () => ({
  db: {
    insert: vi.fn()
  }
}));
vi.mock('@/drizzle/schema', () => ({
  payments: {}
}));

describe('POST /api/payments/razorpay/create', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    
    // Default DB mock implementation
    vi.mocked(db.insert).mockReturnValue({
      values: vi.fn().mockResolvedValue({})
    } as any);
  });

  // HAPPY PATH: Acceptance Criterion "Returns Razorpay order object {id, amount, currency}"
  describe('Happy Path', () => {
    it('should return 200 and order details for valid request', async () => {
      const mockOrder = {
        id: 'rzp_test_123',
        amount: 29900, // Razorpay uses smallest currency unit (paise/cents)
        currency: 'INR'
      };

      vi.mocked(razorpayLib.createRazorpayOrder).mockResolvedValue(mockOrder as any);

      const req = new NextRequest('http://localhost/api/payments/razorpay/create', {
        method: 'POST',
        body: JSON.stringify({
          amount: 299,
          currency: 'INR',
          resourceId: 'res_abc_123'
        })
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.orderId).toBe('rzp_test_123');
      expect(data.amount).toBe(29900);
      expect(data.currency).toBe('INR');

      // Verify record stored in DB
      expect(db.insert).toHaveBeenCalled();
    });
  });

  // ERROR HANDLING: Invalid amounts
  describe('Validation Checks', () => {
    it('should return 400 for invalid amount', async () => {
      const req = new NextRequest('http://localhost/api/payments/razorpay/create', {
        method: 'POST',
        body: JSON.stringify({
          amount: -5,
          currency: 'INR',
          resourceId: 'res_abc_123'
        })
      });

      const response = await POST(req);
      expect(response.status).toBe(400);
    });

    it('should return 400 for unsupported currency', async () => {
      const req = new NextRequest('http://localhost/api/payments/razorpay/create', {
        method: 'POST',
        body: JSON.stringify({
          amount: 299,
          currency: 'XYZ',
          resourceId: 'res_abc_123'
        })
      });

      const response = await POST(req);
      expect(response.status).toBe(400);
    });

    it('should return 400 when resourceId is missing', async () => {
      const req = new NextRequest('http://localhost/api/payments/razorpay/create', {
        method: 'POST',
        body: JSON.stringify({
          amount: 299,
          currency: 'INR'
        })
      });

      const response = await POST(req);
      expect(response.status).toBe(400);
    });
  });

  // ERROR HANDLING: Razorpay service failure
  describe('Resilience', () => {
    it('should handle Razorpay API errors with 500 status', async () => {
      vi.mocked(razorpayLib.createRazorpayOrder).mockRejectedValue(
        new Error('Razorpay service unavailable')
      );

      const req = new NextRequest('http://localhost/api/payments/razorpay/create', {
        method: 'POST',
        body: JSON.stringify({
          amount: 299,
          currency: 'INR',
          resourceId: 'res_abc_123'
        })
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toContain('order creation failed');
    });
  });
});
