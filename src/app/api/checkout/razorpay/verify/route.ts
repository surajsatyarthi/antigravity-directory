import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { payments, resources } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';

import { checkRateLimit as rateLimit } from '@/lib/ratelimit';

export async function POST(request: NextRequest) {
  try {
    // Rate Limit: 10 requests per minute for verification
    const ratelimitResponse = await rateLimit(request, { limit: 10, windowMs: 60000 });
    if (ratelimitResponse) return ratelimitResponse;

    const signatureHeader = request.headers.get('x-razorpay-signature');
    const rawBody = await request.text();
    let body;
    
    try {
      body = JSON.parse(rawBody);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      event 
    } = body;

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    let orderId = razorpay_order_id;
    let isValid = false;

    // 1. Handle Webhook (Header-based)
    if (signatureHeader) {
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(rawBody)
        .digest('hex');
      
      isValid = (expectedSignature === signatureHeader);
      
      if (isValid && body.event === 'order.paid') {
        orderId = body.payload.payment.entity.order_id;
      } else if (isValid && body.event !== 'order.paid') {
        // Valid signature but not an event we care about
        return NextResponse.json({ received: true }, { status: 200 });
      }
    } 
    // 2. Handle Frontend Verification (Body-based)
    else if (razorpay_order_id && razorpay_signature) {
      const hmac = crypto.createHmac('sha256', secret);
      hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
      const generatedSignature = hmac.digest('hex');
      isValid = (generatedSignature === razorpay_signature);
    } else {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Find original payment record
    const paymentRecord = await db.query.payments.findFirst({
      where: eq(payments.transactionId, orderId),
    });

    if (!paymentRecord) {
      // Return 200 for webhooks even if not found to stop retries, 404 for frontend
      if (signatureHeader) return NextResponse.json({ message: 'Order not found' }, { status: 200 });
      return NextResponse.json({ error: 'Payment record not found' }, { status: 404 });
    }

    if (paymentRecord.status === 'SUCCEEDED') {
      return NextResponse.json({ status: 'OK', message: 'Already processed' }, { status: 200 });
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

    return NextResponse.json({ status: 'OK', received: true }, { status: 200 });

  } catch (error) {
    console.error('Razorpay verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error processing verification.' },
      { status: 500 }
    );
  }
}
