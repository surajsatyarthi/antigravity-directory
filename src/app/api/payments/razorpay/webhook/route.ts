import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { payments, resources } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature header' }, { status: 400 });
    }

    // Verify HMAC signature
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      console.error('RAZORPAY_KEY_SECRET is not configured');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const eventData = JSON.parse(body);
    
    // We only care about order.paid in this context
    if (eventData.event === 'order.paid') {
      const razorpayOrderId = eventData.payload.payment.entity.order_id;

      // Find original payment record
      const paymentRecord = await db.query.payments.findFirst({
        where: eq(payments.transactionId, razorpayOrderId),
      });

      if (!paymentRecord) {
        console.warn(`Payment record not found for Razorpay order: ${razorpayOrderId}`);
        return NextResponse.json({ message: 'Order not found' }, { status: 200 }); // Return 200 to acknowledge webhook
      }

      // Replay prevention
      if (paymentRecord.status === 'SUCCEEDED') {
        return NextResponse.json({ message: 'Payment already processed' }, { status: 200 });
      }

      // Update database status
      await db.update(payments)
        .set({
          status: 'SUCCEEDED',
          updatedAt: new Date(),
        })
        .where(eq(payments.id, paymentRecord.id));

      // Mark resource as featured
      if (paymentRecord.resourceId) {
        await db.update(resources)
          .set({
            featured: true,
          })
          .where(eq(resources.id, paymentRecord.resourceId));
      }

      console.log(`Successfully processed Razorpay payment for order: ${razorpayOrderId}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error('Razorpay webhook processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error processing webhook.' },
      { status: 500 }
    );
  }
}
