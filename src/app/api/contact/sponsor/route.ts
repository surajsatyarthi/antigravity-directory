import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // For now, log and return success. Wire to email provider later.
  const body = await req.json();
  console.log('[sponsor-contact]', body);
  return NextResponse.json({ ok: true });
}
