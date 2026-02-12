import { NextRequest, NextResponse } from 'next/server';
import { createPayPalOrder } from '@/lib/payment/paypal';
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
        title: true,
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

    // Create PayPal Order
    // Amount from DB is in cents, PayPal expects string "10.00"
    const amountString = (resource.price / 100).toFixed(2);
    const currency = resource.currency || 'USD';

    const paypalOrder = await createPayPalOrder({
      amount: amountString,
      currency: currency,
      description: `Purchase: ${resource.title}`
    });

    // Calculate split (80/20)
    const creatorEarnings = Math.floor(resource.price * 0.8);
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
      currency: currency,
      paymentMethod: 'paypal',
      paymentId: paypalOrder.id,
      orderId: paypalOrder.id,
      status: 'pending',
    });

    return NextResponse.json({
      orderId: paypalOrder.id
    });

  } catch (error) {
    console.error('PayPal purchase error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
