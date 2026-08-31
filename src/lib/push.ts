import { getProgram } from '../data/programs';
import { useAppStore } from '../state/store';

/** Real background reminders: a Web Push subscription registered against our own service
 * worker, synced to the server (KV-backed) whenever notifications/reminders change. The
 * server-side cron (see api/cron/reminders) sends the actual push, so this fires even with
 * every tab closed — unlike the old tab-must-be-open poll in lib/notifications.ts, which
 * stays in place as a fallback for browsers/contexts where push isn't available. */

const DEVICE_ID_KEY = 'asmetry_device_id';

export function pushSupported(): boolean {
  return typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window;
}

function getDeviceId(): string {
  let id = localStorage.getItem(DEVICE_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(DEVICE_ID_KEY, id);
  }
  return id;
}

function urlBase64ToUint8Array(base64String: string): Uint8Array<ArrayBuffer> {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}

async function ensureSubscription(): Promise<PushSubscription | null> {
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  if (!publicKey) return null;
  const registration = await navigator.serviceWorker.register('/sw.js');
  await navigator.serviceWorker.ready;
  const existing = await registration.pushManager.getSubscription();
  if (existing) return existing;
  return registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey),
  });
}

/** Call whenever notifications are enabled, or a reminder time / active program changes. */
export async function syncPushReminders(): Promise<void> {
  if (!pushSupported()) return;
  const { settings, started, language } = useAppStore.getState();

  if (!settings.notifications || typeof Notification === 'undefined' || Notification.permission !== 'granted') {
    return;
  }

  try {
    const subscription = await ensureSubscription();
    if (!subscription) return;

    const reminders = started.map((s) => ({
      programId: s.id,
      time: s.reminder,
      name: getProgram(s.id)?.name ?? s.id,
    }));

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    await fetch('/api/push/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId: getDeviceId(), subscription: subscription.toJSON(), reminders, language, timeZone }),
    });
  } catch {
    // Best-effort — the in-tab poll in lib/notifications.ts still covers this session.
  }
}

/** Call when the user turns notifications off. */
export async function disablePush(): Promise<void> {
  if (!pushSupported()) return;
  try {
    const registration = await navigator.serviceWorker.getRegistration('/sw.js');
    const subscription = await registration?.pushManager.getSubscription();
    await subscription?.unsubscribe();
  } catch {
    // Ignore — clearing the server-side record below is what actually stops sends.
  }
  const deviceId = localStorage.getItem(DEVICE_ID_KEY);
  if (!deviceId) return;
  try {
    await fetch('/api/push/unsubscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId }),
    });
  } catch {
    // Best-effort.
  }
}
