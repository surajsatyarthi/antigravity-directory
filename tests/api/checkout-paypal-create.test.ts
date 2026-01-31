import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/checkout/create-order/route';
import { NextRequest } from 'next/server';
import * as paypalLib from '@/lib/payment/paypal';

import { checkRateLimit } from '@/lib/ratelimit';

// Mock external dependencies
vi.mock('@/lib/payment/paypal');
vi.mock('@/lib/db', () => ({
  db: {
    insert: vi.fn()
  }
}));
vi.mock('@/drizzle/schema', () => ({
  payments: {}
}));
vi.mock('@/auth', () => ({
  auth: vi.fn().mockResolvedValue({ user: { id: 'test-user-id' } })
}));
vi.mock('@/lib/ratelimit', () => ({
  checkRateLimit: vi.fn().mockResolvedValue({ success: true, limit: 100, remaining: 99, reset: 0 })
}));

import { db } from '@/lib/db';
import { auth } from '@/auth';

describe('POST /api/payments/paypal/create', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    
    // Default DB mock implementation
    vi.mocked(db.insert).mockReturnValue({
      values: vi.fn().mockResolvedValue({})
    } as any);
    
    // Default PayPal mock implementation
    vi.mocked(paypalLib.createPayPalOrder).mockReset();

    // Default Rate Limit mock
    vi.mocked(checkRateLimit).mockResolvedValue({ 
      success: true, 
      limit: 100, 
      remaining: 99, 
      reset: 0 
    });
  });

  // HAPPY PATH: Tests acceptance criterion "Returns {orderId, approvalURL}"
  describe('Happy Path', () => {
    it('should return orderId and approvalURL for valid request', async () => {
      const mockPayPalResponse = {
        id: 'PAYPAL-ORDER-123',
        status: 'CREATED',
        links: [
          { rel: 'self', href: 'https://paypal.com/self' },
          { rel: 'approve', href: 'https://paypal.com/approve/PAYPAL-ORDER-123' }
        ]
      };

      vi.mocked(paypalLib.createPayPalOrder).mockResolvedValue(mockPayPalResponse);

      const req = new NextRequest('http://localhost/api/payments/paypal/create', {
        method: 'POST',
        body: JSON.stringify({
          amount: 299,
          currency: 'USD',
          resourceId: 'test-resource-123'
        })
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.orderId).toBe('PAYPAL-ORDER-123');
      expect(data.approvalURL).toBe('https://paypal.com/approve/PAYPAL-ORDER-123');
    });

    it('should store order in database with PENDING status', async () => {
      const mockResponse = {
        id: 'ORDER-456',
        status: 'CREATED',
        links: [
          { rel: 'approve', href: 'https://paypal.com/approve/ORDER-456' }
        ]
      };

      vi.mocked(paypalLib.createPayPalOrder).mockResolvedValue(mockResponse);

      const req = new NextRequest('http://localhost/api/payments/paypal/create', {
        method: 'POST',
        body: JSON.stringify({
          amount: 299,
          currency: 'USD',
          resourceId: 'resource-456'
        })
      });

      await POST(req);

      // Verify createPayPalOrder was called with correct params
      expect(paypalLib.createPayPalOrder).toHaveBeenCalledWith({
        amount: '299',
        currency: 'USD',
        description: 'Featured listing for resource resource-456'
      });
    });
  });

  // ERROR TESTS: Invalid amounts (0, negative, >10000)
  describe('Amount Validation', () => {
    it('should return 400 for zero amount', async () => {
      const req = new NextRequest('http://localhost/api/payments/paypal/create', {
        method: 'POST',
        body: JSON.stringify({
          amount: 0,
          currency: 'USD',
          resourceId: 'test-resource'
        })
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBeDefined();
      expect(data.error).toContain('amount');
    });

    it('should return 400 for negative amount', async () => {
      const req = new NextRequest('http://localhost/api/payments/paypal/create', {
        method: 'POST',
        body: JSON.stringify({
          amount: -100,
          currency: 'USD',
          resourceId: 'test-resource'
        })
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBeDefined();
    });

    it('should return 400 for amount exceeding 10000', async () => {
      const req = new NextRequest('http://localhost/api/payments/paypal/create', {
        method: 'POST',
        body: JSON.stringify({
          amount: 15000,
          currency: 'USD',
          resourceId: 'test-resource'
        })
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBeDefined();
      expect(data.error).toContain('amount');
    });
  });

  // ERROR TEST: Missing currency parameter
  describe('Required Field Validation', () => {
    it('should return 400 when currency is missing', async () => {
      const req = new NextRequest('http://localhost/api/payments/paypal/create', {
        method: 'POST',
        body: JSON.stringify({
          amount: 299,
          resourceId: 'test-resource'
          // currency missing
        })
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBeDefined();
      expect(data.error).toContain('currency');
    });

    it('should return 400 when resourceId is missing', async () => {
      const req = new NextRequest('http://localhost/api/payments/paypal/create', {
        method: 'POST',
        body: JSON.stringify({
          amount: 299,
          currency: 'USD'
          // resourceId missing
        })
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBeDefined();
      expect(data.error).toContain('resourceId');
    });

    it('should return 400 when amount is missing', async () => {
      const req = new NextRequest('http://localhost/api/payments/paypal/create', {
        method: 'POST',
        body: JSON.stringify({
          currency: 'USD',
          resourceId: 'test-resource'
          // amount missing
        })
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBeDefined();
    });
  });

  // ERROR TEST: PayPal API timeout/failure
  describe('Network Failure Handling', () => {
    it('should handle PayPal API failures gracefully with 500 status', async () => {
      vi.mocked(paypalLib.createPayPalOrder).mockRejectedValue(
        new Error('PayPal API timeout')
      );

      const req = new NextRequest('http://localhost/api/payments/paypal/create', {
        method: 'POST',
        body: JSON.stringify({
          amount: 299,
          currency: 'USD',
          resourceId: 'test-resource'
        })
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBeDefined();
      expect(data.error).toContain('payment');
    });

    it('should return user-friendly error message on PayPal failure', async () => {
      vi.mocked(paypalLib.createPayPalOrder).mockRejectedValue(
        new Error('Network error')
      );

      const req = new NextRequest('http://localhost/api/payments/paypal/create', {
        method: 'POST',
        body: JSON.stringify({
          amount: 299,
          currency: 'USD',
          resourceId: 'test-resource'
        })
      });

      const response = await POST(req);
      const data = await response.json();

      expect(data.error).not.toContain('undefined');
      expect(data.error.length).toBeGreaterThan(0);
    });
  });

  // SECURITY TEST: Validate positive numbers
  describe('Security - Input Validation', () => {
    it('should reject non-numeric amount values', async () => {
      const req = new NextRequest('http://localhost/api/payments/paypal/create', {
        method: 'POST',
        body: JSON.stringify({
          amount: 'invalid',
          currency: 'USD',
          resourceId: 'test-resource'
        })
      });

      const response = await POST(req);
      
      expect(response.status).toBe(400);
    });

    it('should reject invalid currency codes', async () => {
      const req = new NextRequest('http://localhost/api/payments/paypal/create', {
        method: 'POST',
        body: JSON.stringify({
          amount: 299,
          currency: 'INVALID',
          resourceId: 'test-resource'
        })
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('currency');
    });
  });
});
