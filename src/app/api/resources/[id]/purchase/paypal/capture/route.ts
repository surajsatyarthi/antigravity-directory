import { NextRequest, NextResponse } from 'next/server';
import { capturePayPalPayment } from '@/lib/payment/paypal';
import { db } from '@/lib/db';
import { purchases, creatorEarnings, userResourceAccess, users, resources } from '@/drizzle/schema';
import { eq, sql } from 'drizzle-orm';
import { auth } from '@/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: resourceId } = await params;
    const body = await request.json();
    const { orderId } = body;

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!orderId) {
      return NextResponse.json({ error: 'Missing specific orderId' }, { status: 400 });
    }

    // Capture Payment
    const captureData = await capturePayPalPayment(orderId);

    if (captureData.status !== 'COMPLETED') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 400 });
    }

    // Find the pending purchase
    const purchase = await db.query.purchases.findFirst({
      where: eq(purchases.orderId, orderId),
    });

    if (!purchase) {
      return NextResponse.json({ error: 'Purchase record not found' }, { status: 404 });
    }

    if (purchase.status === 'completed') {
      return NextResponse.json({ status: 'already_completed' });
    }

    // Update purchase status
    await db.update(purchases)
      .set({
        status: 'completed',
        completedAt: new Date(),
        paymentId: captureData.id, // Update with actual capture ID if available, or keep orderId
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
      .onConflictDoNothing();

    return NextResponse.json({ status: 'COMPLETED', purchaseId: purchase.id });

  } catch (error) {
    console.error('PayPal capture error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
