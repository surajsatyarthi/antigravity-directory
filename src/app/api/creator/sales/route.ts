import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { purchases, resources, users } from '@/drizzle/schema';
import { eq, desc, count } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse query params
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
    const offset = (page - 1) * limit;

    // Fetch paginated sales history
    const sales = await db
      .select({
        id: purchases.id,
        resourceName: resources.title,
        resourceSlug: resources.slug,
        saleDate: purchases.createdAt,
        price: purchases.amountTotal,
        buyerUsername: users.username,
        buyerName: users.name,
        commissionPercent: purchases.creatorPercent,
        creatorEarnings: purchases.creatorEarnings,
        currency: purchases.currency,
      })
      .from(purchases)
      .innerJoin(resources, eq(purchases.resourceId, resources.id))
      .innerJoin(users, eq(purchases.buyerId, users.id))
      .where(eq(resources.authorId, session.user.id))
      .orderBy(desc(purchases.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count
    const totalCountResult = await db
      .select({ count: count() })
      .from(purchases)
      .innerJoin(resources, eq(purchases.resourceId, resources.id))
      .where(eq(resources.authorId, session.user.id));

    const totalCount = totalCountResult[0]?.count || 0;

    return NextResponse.json({
      sales,
      totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    console.error('Error fetching sales history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sales history' },
      { status: 500 }
    );
  }
}
