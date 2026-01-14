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
const verifiedPayments = new Set<string>();

/**
 * Create a Razorpay order
 */
export async function createRazorpayOrder(params: RazorpayOrderParams): Promise<RazorpayOrder> {
  const { amount, currency, receipt } = params;

  // Validate amount
  if (amount <= 0) {
    throw new Error('Invalid amount: must be a positive number');
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error('Razorpay credentials not configured');
  }

  const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

  // Convert amount to paise (smallest currency unit)
  const amountInPaise = Math.round(amount * 100);

  const response = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: amountInPaise,
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`Failed to create Razorpay order`);
  }

  return await response.json();
}

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

  // Check for replay attack
  const paymentKey = `${orderId}:${paymentId}`;
  if (verifiedPayments.has(paymentKey)) {
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
      // Mark payment as verified
      verifiedPayments.add(paymentKey);
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
 */
export function clearVerifiedPaymentsCache(): void {
  verifiedPayments.clear();
}
