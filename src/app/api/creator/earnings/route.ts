import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { purchases, payoutRequests, resources } from '@/drizzle/schema';
import { eq, and, sum } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch all purchases for resources owned by this creator
    const creatorPurchases = await db
      .select({
        id: purchases.id,
        creatorEarnings: purchases.creatorEarnings,
        creatorPercent: purchases.creatorPercent,
        amountTotal: purchases.amountTotal,
      })
      .from(purchases)
      .innerJoin(resources, eq(purchases.resourceId, resources.id))
      .where(eq(resources.authorId, session.user.id));

    // Calculate earnings breakdown
    const firstTwoEarnings = creatorPurchases
      .filter(p => p.creatorPercent === 100)
      .reduce((sum: number, p) => sum + p.creatorEarnings, 0);

    const subsequentEarnings = creatorPurchases
      .filter(p => p.creatorPercent === 80)
      .reduce((sum: number, p) => sum + p.creatorEarnings, 0);

    const totalEarnings = firstTwoEarnings + subsequentEarnings;
    const salesCount = creatorPurchases.length;
    const firstTwoSalesCount = creatorPurchases.filter((p) => p.creatorPercent === 100).length;

    // Calculate pending payout (total earnings - completed payouts)
    const completedPayouts = await db
      .select()
      .from(payoutRequests)
      .where(
        and(
          eq(payoutRequests.creatorId, session.user.id),
          eq(payoutRequests.status, 'completed')
        )
      );

    const totalPaidOut = completedPayouts.reduce((sum: number, p) => sum + p.amount, 0);
    const pendingPayout = totalEarnings - totalPaidOut;

    return NextResponse.json({
      totalEarnings,
      firstTwoEarnings,
      subsequentEarnings,
      salesCount,
      firstTwoSalesCount,
      pendingPayout,
      currency: 'USD',
    });
  } catch (error) {
    console.error('Error fetching creator earnings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch earnings' },
      { status: 500 }
    );
  }
}
