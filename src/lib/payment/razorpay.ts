/**
 * Razorpay Payment Integration
 * 
 * Revenue-critical module for processing Razorpay payments (India)
 * Handles order creation and payment verification
 */

import crypto from 'crypto';

interface RazorpayOrderParams {
  amount: number; // In rupees
  currency: string;
  receipt?: string;
  notes?: Record<string, string>;
}

interface RazorpayOrder {
  id: string;
  amount: number; // In paise
  currency: string;
  receipt?: string;
}

interface RazorpayVerificationParams {
  orderId: string;
  paymentId: string;
  signature: string;
}

interface RazorpayVerificationResult {
  verified: boolean;
  error?: string;
}

// Track verified payments to prevent replay attacks
// SEC-001 CHECK: Use database state instead of in-memory Set
import { db } from '@/lib/db';
import { payments } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

/**
 * Verify Razorpay payment signature
 * 
 * Security-critical: Prevents payment tampering and replay attacks
 */
export async function verifyRazorpayPayment(
  params: RazorpayVerificationParams
): Promise<RazorpayVerificationResult> {
  const { orderId, paymentId, signature } = params;

  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keySecret) {
    return {
      verified: false,
      error: 'Razorpay secret not configured',
    };
  }

  // Check for replay attack using Database
  const existingPayment = await db
    .select()
    .from(payments)
    .where(eq(payments.transactionId, paymentId))
    .limit(1);

  if (existingPayment.length > 0 && existingPayment[0].status === 'SUCCEEDED') {
    return {
      verified: false,
      error: 'Payment already verified (potential replay attack)',
    };
  }

  try {
    // Generate expected signature
    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    // Verify signature using timing-safe comparison
    const isValid = signature.length === generatedSignature.length &&
      crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(generatedSignature)
      );

    if (isValid) {
      // Note: The caller is responsible for inserting/updating the payment record in the DB
      // to 'SUCCEEDED' to effectively "mark" it as verified for future checks.
      return { verified: true };
    }

    return {
      verified: false,
      error: 'Invalid signature',
    };
  } catch (error) {
    return {
      verified: false,
      error: 'Invalid signature',
    };
  }
}

/**
 * Clear verified payments cache (for testing)
 * @deprecated DB-backed verification does not use in-memory cache.
 */
export function clearVerifiedPaymentsCache(): void {
  // No-op: DB verification is used instead of local cache
}
