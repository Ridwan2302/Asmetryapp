'use client';

import { useEffect } from 'react';
import { checkAndFireReminders } from '@/lib/notifications';

/** Mounted once near the app root. Polls every 15s so reminders fire while any tab is open. */
export function NotificationScheduler() {
  useEffect(() => {
    const id = setInterval(checkAndFireReminders, 15000);
    checkAndFireReminders();
    return () => clearInterval(id);
  }, []);

  return null;
}
