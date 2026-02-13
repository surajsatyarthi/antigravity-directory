import { NextRequest, NextResponse } from 'next/server';
import { createRazorpayOrder } from '@/lib/payment/razorpay';
import { db } from '@/lib/db';
import { purchases, resources } from '@/drizzle/schema';
import { auth } from '@/auth';
import { eq } from 'drizzle-orm';
import { checkRateLimit as rateLimit } from '@/lib/ratelimit';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: resourceId } = await params;

    // Rate Limit: 5 requests per minute
    const rateLimitResult = await rateLimit(request, 5, 60000);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString() } }
      );
    }

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch resource
    const resource = await db.query.resources.findFirst({
      where: eq(resources.id, resourceId),
      columns: {
        id: true,
        price: true,
        currency: true,
        authorId: true,
        salesCount: true,
      }
    });

    if (!resource) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }

    if (!resource.price || resource.price <= 0) {
      return NextResponse.json({ error: 'Resource is free' }, { status: 400 });
    }

    if (!resource.authorId) {
      return NextResponse.json({ error: 'Resource has no author' }, { status: 400 });
    }

    // Create Razorpay Order
    // Amount is in cents/paise in DB, but createRazorpayOrder expects major units (it multiplies by 100)
    const rzpOrder = await createRazorpayOrder({
      amount: resource.price / 100,
      currency: resource.currency || 'USD',
      notes: {
        resourceId,
        buyerId: session.user.id,
        type: 'resource_purchase'
      }
    });

    // Calculate dynamic split based on salesCount
    // First 2 sales: 100% to creator, 0% to platform
    // Sales 3+: 80% to creator, 20% to platform
    const isFirstTwoSales = resource.salesCount < 2;
    const creatorPercent = isFirstTwoSales ? 100 : 80;
    const platformPercent = isFirstTwoSales ? 0 : 20;
    
    const creatorEarnings = Math.floor(resource.price * (creatorPercent / 100));
    const platformFee = resource.price - creatorEarnings;

    // Record pending purchase
    await db.insert(purchases).values({
      id: crypto.randomUUID(),
      resourceId,
      buyerId: session.user.id,
      creatorId: resource.authorId,
      amountTotal: resource.price,
      creatorEarnings,
      platformFee,
      creatorPercent,
      platformPercent,
      currency: resource.currency || 'USD',
      paymentMethod: 'razorpay',
      paymentId: rzpOrder.id, // We use order_id as payment_id initially, updated on success often
      orderId: rzpOrder.id,
      status: 'pending',
    });

    return NextResponse.json({
      orderId: rzpOrder.id,
      amount: resource.price,
      currency: resource.currency || 'USD',
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.error('Razorpay purchase error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
