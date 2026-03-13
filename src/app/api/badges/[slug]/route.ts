import { db } from '@/lib/db';
import { resources, ratings } from '@/drizzle/schema';
import { eq, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Fetch resource title
  const [data] = await db
    .select({
      title: resources.title,
    })
    .from(resources)
    .where(eq(resources.slug, slug))
    .limit(1);

  if (!data) {
    return new NextResponse('Resource not found', { status: 404 });
  }



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
      <text x="40" y="30" fill="#94A3B8" font-family="Verdana, sans-serif" font-size="9" font-weight="bold" text-anchor="start" style="text-transform: uppercase; letter-spacing: 0.1em;">Listed on Antigravity Directory</text>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600', // 5 min cache
    },
  });
}
