import { NextRequest, NextResponse } from 'next/server';
import { capturePayPalPayment } from '@/lib/payment/paypal';
import { db } from '@/lib/db';
import { payments, resources } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

interface CapturePayPalOrderRequest {
  orderId: string;
}

export async function POST(request: NextRequest) {
  try {
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
