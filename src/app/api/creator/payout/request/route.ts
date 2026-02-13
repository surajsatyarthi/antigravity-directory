import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { purchases, payoutRequests, resources, users } from '@/drizzle/schema';
import { eq, and } from 'drizzle-orm';
import { nanoid } from 'nanoid';

// Minimum payout threshold: $10 USD = 1000 cents
const MIN_PAYOUT_CENTS = 1000;

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { amount, paymentMethod, accountDetails } = body;

    // Validation
    if (!amount || amount < MIN_PAYOUT_CENTS) {
      return NextResponse.json(
        { error: `Minimum payout amount is $${MIN_PAYOUT_CENTS / 100}` },
        { status: 400 }
      );
    }

    if (!paymentMethod || !['razorpay', 'paypal'].includes(paymentMethod)) {
      return NextResponse.json(
        { error: 'Invalid payment method. Must be "razorpay" or "paypal"' },
        { status: 400 }
      );
    }

    if (!accountDetails || accountDetails.length < 5) {
      return NextResponse.json(
        { error: 'Account details must be at least 5 characters' },
        { status: 400 }
      );
    }

    // Calculate available balance
    const creatorPurchases = await db
      .select({
        creatorEarnings: purchases.creatorEarnings,
      })
      .from(purchases)
      .innerJoin(resources, eq(purchases.resourceId, resources.id))
      .where(eq(resources.authorId, session.user.id));

    const totalEarnings = creatorPurchases.reduce((sum: number, p) => sum + p.creatorEarnings, 0);

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
    const availableBalance = totalEarnings - totalPaidOut;

    // Verify amount doesn't exceed available balance
    if (amount > availableBalance) {
      return NextResponse.json(
        { error: `Insufficient balance. Available: $${availableBalance / 100}` },
        { status: 400 }
      );
    }

    // Create payout request
    const payoutId = nanoid();
    await db.insert(payoutRequests).values({
      id: payoutId,
      creatorId: session.user.id,
      amount,
      currency: 'USD',
      paymentMethod,
      accountDetails,
      status: 'pending',
      requestedAt: new Date(),
    });

    // Get user details for email
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);

    // TODO: Send email notifications (creator + admin)
    // For MVP, we'll add email functionality in a follow-up
    console.log(`Payout request created: ${payoutId} for user ${session.user.email}`);
    console.log(`Amount: $${amount / 100}, Method: ${paymentMethod}`);

    return NextResponse.json({
      success: true,
      payoutRequestId: payoutId,
      message: 'Payout request submitted successfully. We\'ll review within 3-5 business days.',
    });
  } catch (error) {
    console.error('Error creating payout request:', error);
    return NextResponse.json(
      { error: 'Failed to create payout request' },
      { status: 500 }
    );
  }
}
