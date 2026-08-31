'use client';

import { useEffect } from 'react';
import { checkAndFireReminders } from '@/lib/notifications';
import { syncPushReminders } from '@/lib/push';

/** Mounted once near the app root. Polls every 15s so reminders fire while any tab is open
 * (see lib/notifications.ts), and re-syncs the real Web Push subscription/schedule once on
 * mount so it stays current after the app was closed for a while (e.g. the KV record having
 * been evicted, or a browser-rotated push subscription) — a no-op if push was never enabled. */
export function NotificationScheduler() {
  useEffect(() => {
    const id = setInterval(checkAndFireReminders, 15000);
    checkAndFireReminders();
    void syncPushReminders();
    return () => clearInterval(id);
  }, []);

  return null;
}
