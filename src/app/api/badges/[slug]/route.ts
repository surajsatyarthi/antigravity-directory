import { db } from '@/lib/db';
import { resources } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const [resource] = await db
    .select({ title: resources.title })
    .from(resources)
    .where(eq(resources.slug, slug))
    .limit(1);

  if (!resource) {
    return new NextResponse('Resource not found', { status: 404 });
  }

  // Simple SVG Badge
  const svg = `
    <svg width="150" height="40" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="150" height="40" rx="8" fill="black"/>
      <rect x="0.5" y="0.5" width="149" height="39" rx="7.5" stroke="#1F2937"/>
      <path d="M25 12L15 22H22L18 28L28 18H21L25 12Z" fill="white"/>
      <text x="40" y="18" fill="#9CA3AF" font-family="monospace" font-size="8" font-weight="bold" text-anchor="start" style="text-transform: uppercase; letter-spacing: 0.1em;">Featured on</text>
      <text x="40" y="30" fill="white" font-family="monospace" font-size="12" font-weight="black" text-anchor="start" style="text-transform: lowercase;">Antigravity</text>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
