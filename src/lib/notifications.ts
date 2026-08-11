import { getProgram } from '../data/programs';
import { useAppStore } from '../state/store';
import { speak } from './voice';

/** Browser reminders, best-effort: fire while a tab is open (any tab, backgrounded is fine),
 * via the Notification API. There is no reliable way to deliver a notification once every
 * browser tab is fully closed without a Web Push backend (VAPID keys + a server to hold
 * subscriptions) — out of scope for a static deploy. See README for the tradeoff. */

export function notificationsSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (!notificationsSupported()) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;
  const result = await Notification.requestPermission();
  return result === 'granted';
}

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function taskListFor(programId: string, dayNumber: number): string {
  const program = getProgram(programId);
  if (!program) return "Today's checklist is ready.";
  const week = program.weeks[Math.min(3, Math.ceil(dayNumber / 7) - 1)] ?? program.weeks[0];
  return week.tasks.join(' · ');
}

/** Call periodically (see NotificationScheduler). Checks every active program's reminder
 * time against the current minute and fires a browser Notification once per program per day. */
export function checkAndFireReminders() {
  if (!notificationsSupported() || Notification.permission !== 'granted') return;
  const { started, settings, language, markReminderFired } = useAppStore.getState();
  if (!settings.notifications) return;

  const now = new Date();
  const hm = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const key = `${todayKey()} ${hm}`;

  for (const s of started) {
    if (s.reminder === hm && s.lastRem !== key) {
      const program = getProgram(s.id);
      if (!program) continue;
      const dayNumber = Math.min(28, s.done + 1);
      markReminderFired(s.id, key);
      const body = `DAY ${dayNumber}/28 · ${taskListFor(s.id, dayNumber)}`;
      new Notification(program.name, { body, tag: `asmetry-${s.id}` });
      if (settings.voiceGuide) speak(`${program.name}. ${body}`, language);
    }
  }
}
