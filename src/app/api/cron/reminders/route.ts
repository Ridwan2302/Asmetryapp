import { Receiver } from '@upstash/qstash';
import { NextRequest, NextResponse } from 'next/server';
import webpush from 'web-push';
import { kvDel, kvGet, kvSet, kvSmembers, kvSrem } from '@/lib/kv';

/** Hit once a minute by an external scheduler (Upstash QStash) — checks every stored device's
 * reminders against its own local time and sends the ones that are due via real Web Push, so
 * this fires even with the app fully closed. See lib/push.ts for how devices get registered. */

const DEVICES_SET_KEY = 'push:devices';

const REMINDER_BODY: Record<string, string> = {
  fr: 'C’est l’heure de votre séance quotidienne.',
  en: 'Time for your daily session.',
};

interface Reminder {
  programId: string;
  time: string;
  name: string;
}

interface DeviceRecord {
  subscription: { endpoint: string; keys: { p256dh: string; auth: string } };
  reminders: Reminder[];
  language: string;
  timeZone: string;
  sentLog: Record<string, string>;
}

function localHM(now: Date, timeZone: string): string | null {
  try {
    return new Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', minute: '2-digit', hour12: false }).format(now);
  } catch {
    return null;
  }
}

function localDate(now: Date, timeZone: string): string | null {
  try {
    return new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
  } catch {
    return null;
  }
}

async function isAuthorized(req: NextRequest, rawBody: string): Promise<boolean> {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get('authorization');
    if (auth === `Bearer ${cronSecret}`) return true;
  }

  const currentSigningKey = process.env.QSTASH_CURRENT_SIGNING_KEY;
  const nextSigningKey = process.env.QSTASH_NEXT_SIGNING_KEY;
  const signature = req.headers.get('upstash-signature');
  if (!currentSigningKey || !nextSigningKey || !signature) return false;

  try {
    const receiver = new Receiver({ currentSigningKey, nextSigningKey });
    return await receiver.verify({ signature, body: rawBody });
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  if (!(await isAuthorized(req, rawBody))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
  const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;
  const vapidSubject = process.env.VAPID_SUBJECT;
  if (!vapidPublicKey || !vapidPrivateKey || !vapidSubject) {
    return NextResponse.json({ error: 'VAPID keys not configured' }, { status: 500 });
  }
  webpush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);

  const now = new Date();
  let deviceIds: string[] = [];
  try {
    deviceIds = await kvSmembers(DEVICES_SET_KEY);
  } catch (err) {
    console.error('cron/reminders: could not list devices:', err);
    return NextResponse.json({ error: 'Storage unavailable' }, { status: 503 });
  }

  let checked = 0;
  let sent = 0;

  for (const deviceId of deviceIds) {
    checked++;
    const key = `push:device:${deviceId}`;
    let record: DeviceRecord;
    try {
      const raw = await kvGet(key);
      if (!raw) {
        await kvSrem(DEVICES_SET_KEY, deviceId);
        continue;
      }
      record = JSON.parse(raw);
    } catch {
      continue;
    }

    const hm = localHM(now, record.timeZone);
    const today = localDate(now, record.timeZone);
    if (!hm || !today) continue;

    let dirty = false;
    let deviceGone = false;

    for (const reminder of record.reminders) {
      if (reminder.time !== hm) continue;
      if (record.sentLog[reminder.programId] === today) continue;

      const body = REMINDER_BODY[record.language] ?? REMINDER_BODY.en;
      try {
        await webpush.sendNotification(
          record.subscription,
          JSON.stringify({ title: reminder.name, body, url: `/programs/${reminder.programId}`, tag: `asmetry-${reminder.programId}` })
        );
        record.sentLog[reminder.programId] = today;
        dirty = true;
        sent++;
      } catch (err: unknown) {
        const statusCode = (err as { statusCode?: number })?.statusCode;
        if (statusCode === 404 || statusCode === 410) {
          deviceGone = true;
          break;
        }
        console.error(`cron/reminders: push failed for ${deviceId}/${reminder.programId}:`, err);
      }
    }

    if (deviceGone) {
      try {
        await kvDel(key);
        await kvSrem(DEVICES_SET_KEY, deviceId);
      } catch {
        // Best-effort cleanup — will retry next run.
      }
      continue;
    }

    if (dirty) {
      try {
        await kvSet(key, JSON.stringify(record));
      } catch (err) {
        console.error(`cron/reminders: could not persist sentLog for ${deviceId}:`, err);
      }
    }
  }

  return NextResponse.json({ checked, sent });
}
