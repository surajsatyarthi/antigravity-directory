import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resources } from '@/drizzle/schema';
import { auth } from '@/auth';
import { eq } from 'drizzle-orm';
import { checkRateLimit as rateLimit } from '@/lib/ratelimit';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: resourceId } = await params;

    // Rate Limit: 10 requests per minute
    const rateLimitResult = await rateLimit(request, 10, 60000);
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

    // Fetch resource to verify ownership
    const resource = await db.query.resources.findFirst({
      where: eq(resources.id, resourceId),
      columns: {
        id: true,
        authorId: true,
      }
    });

    if (!resource) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }

    // Only author can update price
    if (resource.authorId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden: You are not the author' }, { status: 403 });
    }

    const body = await request.json();
    const { price, currency } = body;

    // Validate inputs
    if (price === undefined) {
      return NextResponse.json({ error: 'Price is required' }, { status: 400 });
    }

    const priceNum = Number(price);
    if (isNaN(priceNum) || priceNum < 0) {
      return NextResponse.json({ error: 'Invalid price value' }, { status: 400 });
    }

    if (priceNum > 99900) { // Max $999.00 in cents
      return NextResponse.json({ error: 'Price cannot exceed $999' }, { status: 400 });
    }

    if (currency && !['USD', 'INR'].includes(currency)) {
      return NextResponse.json({ error: 'Currency must be USD or INR' }, { status: 400 });
    }

    // Update resource
    await db.update(resources)
      .set({
        price: priceNum,
        currency: currency || 'USD',
        updatedAt: new Date(),
      })
      .where(eq(resources.id, resourceId));

    return NextResponse.json({
      success: true,
      price: priceNum,
      currency: currency || 'USD',
    });

  } catch (error) {
    console.error('Resource update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
