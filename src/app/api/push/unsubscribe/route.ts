import { NextRequest, NextResponse } from 'next/server';
import { kvDel, kvSrem } from '@/lib/kv';

export async function POST(req: NextRequest) {
  let body: { deviceId?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (typeof body.deviceId !== 'string' || body.deviceId.length < 8 || body.deviceId.length > 128) {
    return NextResponse.json({ error: 'Invalid deviceId' }, { status: 400 });
  }

  try {
    await kvDel(`push:device:${body.deviceId}`);
    await kvSrem('push:devices', body.deviceId);
  } catch (err) {
    console.error('push/unsubscribe KV error:', err);
    return NextResponse.json({ error: 'Storage unavailable' }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
