import { NextRequest, NextResponse } from 'next/server';
import { capturePayPalPayment } from '@/lib/payment/paypal';
import { db } from '@/lib/db';
import { payments, resources, users } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

import { checkRateLimit as rateLimit } from '@/lib/ratelimit';
import { sendPaymentConfirmation } from '@/lib/email/templates';

interface CapturePayPalOrderRequest {
  orderId: string;
}

// Helper function to determine tier from amount (in cents/paise)
function getTierFromAmount(amount: number): 'STANDARD' | 'FEATURED' {
  // STANDARD: $49 = 4900 cents, FEATURED: $149 = 14900 cents
  if (amount >= 10000) return 'FEATURED';
  return 'STANDARD';
}

export async function POST(request: NextRequest) {
  try {
    // Rate Limit: 10 requests per minute for capture (more lenient as it requires orderId)
    const rateLimitResult = await rateLimit(request, 10, 60000);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString() } }
      );
    }

    const body: CapturePayPalOrderRequest = await request.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: 'Missing required field: orderId' },
        { status: 400 }
      );
    }

    // Check if payment already processed
    const existingPayment = await db.query.payments.findFirst({
      where: eq(payments.transactionId, orderId),
    });

    if (!existingPayment) {
      return NextResponse.json(
        { error: 'Payment record not found' },
        { status: 404 }
      );
    }

    if (existingPayment.status === 'SUCCEEDED') {
      return NextResponse.json(
        { error: 'Payment already processed' },
        { status: 400 }
      );
    }

    try {
      // Capture payment via PayPal
      const captureData = await capturePayPalPayment(orderId);

      // Update payment record in database
      await db.update(payments)
        .set({
          status: 'SUCCEEDED',
          updatedAt: new Date(),
        })
        .where(eq(payments.transactionId, orderId));

      // Update resource featured status
      if (existingPayment.resourceId) {
        await db.update(resources)
          .set({
            featured: true,
          })
          .where(eq(resources.id, existingPayment.resourceId));
      }

      // Send payment confirmation email
      try {
        const paymentUser = await db.query.users.findFirst({
          where: eq(users.id, existingPayment.userId || ''),
        });

        const resource = await db.query.resources.findFirst({
          where: eq(resources.id, existingPayment.resourceId || ''),
        });

        if (paymentUser && resource) {
          const tier = getTierFromAmount(existingPayment.amount);
          await sendPaymentConfirmation({
            userEmail: paymentUser.email,
            userName: paymentUser.name || 'there',
            resourceTitle: resource.title,
            amount: existingPayment.amount,
            currency: existingPayment.currency,
            transactionId: captureData.id,
            tier,
          });
        }
      } catch (emailError) {
        // Log but don't fail the payment flow
        console.error('Failed to send payment confirmation email:', emailError);
      }

      return NextResponse.json({
        status: 'COMPLETED',
        transactionId: captureData.id
      }, { status: 200 });

    } catch (captureError: any) {
      console.error('PayPal capture error:', captureError);

      const isDeclined = captureError.message?.toLowerCase().includes('declined');
      const isNetworkError = captureError.message?.toLowerCase().includes('network') || 
                            captureError.message?.toLowerCase().includes('internal');

      if (isDeclined) {
        // Handle declined or failed capture - mark as FAILED in DB
        await db.update(payments)
          .set({
            status: 'FAILED',
            updatedAt: new Date(),
          })
          .where(eq(payments.transactionId, orderId));

        return NextResponse.json(
          { error: 'Payment was declined by PayPal.' },
          { status: 400 }
        );
      }

      // Rethrow to be caught by the outer catch for 500 status
      throw captureError;
    }

  } catch (error) {
    console.error('Capture API error:', error);
    return NextResponse.json(
      { error: 'Internal server error processing capture.' },
      { status: 500 }
    );
  }
}
