import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { purchases, creatorEarnings, userResourceAccess, users, resources } from '@/drizzle/schema';
import { eq, sql } from 'drizzle-orm';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      console.error('RAZORPAY_WEBHOOK_SECRET is not set');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const body = JSON.parse(rawBody);
    const { event, payload } = body;

    // We only care about order.paid (or payment.captured)
    // order.paid is best for matching with our order creation
    if (event === 'order.paid') {
      const { order } = payload;
      const orderId = order.entity.id;
      // const paymentId = payload.payment.entity.id;

      // Find the pending purchase
      const purchase = await db.query.purchases.findFirst({
        where: eq(purchases.orderId, orderId),
      });

      if (!purchase) {
        console.warn(`Purchase not found for orderId: ${orderId}`);
        // Return 200 so they don't retry locally, but log it
        return NextResponse.json({ received: true });
      }

      if (purchase.status === 'completed') {
        return NextResponse.json({ received: true });
      }

      // Update purchase status
      await db.update(purchases)
        .set({
          status: 'completed',
          completedAt: new Date(),
          paymentId: payload.payment.entity.id, // Update with actual payment ID
        })
        .where(eq(purchases.id, purchase.id));

      // 80/20 Split: Update creator earnings
      // Upsert creator earnings
      await db.insert(creatorEarnings)
        .values({
          userId: purchase.creatorId,
          totalEarnings: purchase.creatorEarnings,
          salesCount: 1,
          lastSaleAt: new Date(),
        })
        .onConflictDoUpdate({
          target: creatorEarnings.userId,
          set: {
            totalEarnings: sql`${creatorEarnings.totalEarnings} + ${purchase.creatorEarnings}`,
            salesCount: sql`${creatorEarnings.salesCount} + 1`,
            lastSaleAt: new Date(),
            updatedAt: new Date(),
          },
        });

      // Grant Access
      await db.insert(userResourceAccess)
        .values({
          userId: purchase.buyerId,
          resourceId: purchase.resourceId,
          purchaseId: purchase.id,
          grantedAt: new Date(),
        })
        .onConflictDoNothing(); // Idempotency
      
      console.log(`Purchase completed: ${purchase.id}`);
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Razorpay Webhook Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
