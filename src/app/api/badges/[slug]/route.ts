import { db } from '@/lib/db';
import { resources, ratings } from '@/drizzle/schema';
import { eq, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Fetch dynamic stats
  const [data] = await db
    .select({
      title: resources.title,
      views: resources.views,
      avgRating: sql<number>`coalesce(avg(${ratings.rating}), 0)`,
      ratingCount: sql<number>`count(${ratings.id})`,
    })
    .from(resources)
    .leftJoin(ratings, eq(resources.id, ratings.resourceId))
    .where(eq(resources.slug, slug))
    .groupBy(resources.id)
    .limit(1);

  if (!data) {
    return new NextResponse('Resource not found', { status: 404 });
  }

  // Format numbers (e.g. 1.2k)
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  const viewsText = formatNumber(data.views);
  const ratingText = Number(data.avgRating).toFixed(1);
  const statsLine = `👁 ${viewsText} • ★ ${ratingText}`;

  // Dynamic SVG Badge with Stats
  const svg = `
    <svg width="200" height="50" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="200" y2="50" gradientUnits="userSpaceOnUse">
          <stop stop-color="#0F172A"/>
          <stop offset="1" stop-color="#000000"/>
        </linearGradient>
      </defs>
      <rect width="200" height="50" rx="8" fill="url(#g)"/>
      <rect x="0.5" y="0.5" width="199" height="49" rx="7.5" stroke="#334155"/>
      
      <!-- Logo/Icon Area -->
      <path d="M25 15L15 25H22L18 31L28 21H21L25 15Z" fill="white"/>
      
      <!-- Text Content -->
      <text x="40" y="20" fill="#94A3B8" font-family="Verdana, sans-serif" font-size="9" font-weight="bold" text-anchor="start" style="text-transform: uppercase; letter-spacing: 0.1em;">Featured on Antigravity</text>
      <text x="40" y="38" fill="white" font-family="Verdana, sans-serif" font-size="13" font-weight="bold" text-anchor="start">
        ${statsLine}
      </text>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600', // 5 min cache
    },
  });
}
