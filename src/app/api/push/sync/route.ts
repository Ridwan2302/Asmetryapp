import { NextRequest, NextResponse } from 'next/server';
import { kvGet, kvSadd, kvSet } from '@/lib/kv';

/** Stores (or updates) one device's push subscription + reminder schedule. Called by the
 * client whenever notifications are enabled or a reminder time / active program changes.
 * The cron job (api/cron/reminders) reads these records to decide who to notify. */

const DEVICES_SET_KEY = 'push:devices';

interface ReminderInput {
  programId: string;
  time: string; // "HH:MM"
  name: string;
}

interface SyncBody {
  deviceId: string;
  subscription: { endpoint: string; keys: { p256dh: string; auth: string } };
  reminders: ReminderInput[];
  language: string;
  timeZone: string;
}

function isValidBody(body: unknown): body is SyncBody {
  if (!body || typeof body !== 'object') return false;
  const b = body as Record<string, unknown>;
  if (typeof b.deviceId !== 'string' || b.deviceId.length < 8 || b.deviceId.length > 128) return false;
  const sub = b.subscription as { endpoint?: unknown; keys?: { p256dh?: unknown; auth?: unknown } } | undefined;
  if (!sub || typeof sub.endpoint !== 'string' || !/^https:\/\//.test(sub.endpoint)) return false;
  if (!sub.keys || typeof sub.keys.p256dh !== 'string' || typeof sub.keys.auth !== 'string') return false;
  if (!Array.isArray(b.reminders) || b.reminders.length > 20) return false;
  for (const r of b.reminders as unknown[]) {
    const rr = r as Record<string, unknown>;
    if (typeof rr.programId !== 'string' || typeof rr.name !== 'string') return false;
    if (typeof rr.time !== 'string' || !/^([01]\d|2[0-3]):[0-5]\d$/.test(rr.time)) return false;
  }
  if (typeof b.language !== 'string' || typeof b.timeZone !== 'string' || b.timeZone.length > 64) return false;
  return true;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!isValidBody(body)) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const key = `push:device:${body.deviceId}`;

  // Preserve the per-program "already sent today" log across updates, so editing one
  // reminder time doesn't re-fire another program's reminder that already fired today.
  let sentLog: Record<string, string> = {};
  try {
    const existingRaw = await kvGet(key);
    if (existingRaw) {
      const existing = JSON.parse(existingRaw);
      if (existing && typeof existing.sentLog === 'object') sentLog = existing.sentLog;
    }
  } catch {
    // Corrupt or missing previous record — start fresh.
  }

  const record = {
    subscription: body.subscription,
    reminders: body.reminders,
    language: body.language,
    timeZone: body.timeZone,
    sentLog,
    updatedAt: new Date().toISOString(),
  };

  try {
    await kvSet(key, JSON.stringify(record));
    await kvSadd(DEVICES_SET_KEY, body.deviceId);
  } catch (err) {
    console.error('push/sync KV error:', err);
    return NextResponse.json({ error: 'Storage unavailable' }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
