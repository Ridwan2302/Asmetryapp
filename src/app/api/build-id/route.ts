import { NextResponse } from 'next/server';

/** Returns the running server's build id so clients can detect a newer deploy — see UpdateBanner. */
export async function GET() {
  return NextResponse.json(
    { buildId: process.env.NEXT_PUBLIC_BUILD_ID ?? null },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
