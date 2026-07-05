import * as Notifications from 'expo-notifications';
import { getProgram } from '../data/programs';
import type { StartedProgram } from '../state/types';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const idFor = (programId: string) => `asmetry-reminder-${programId}`;

export async function ensureNotificationPermission(): Promise<boolean> {
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  const requested = await Notifications.requestPermissionsAsync();
  return requested.granted;
}

function taskListFor(programId: string, dayNumber: number): string {
  const program = getProgram(programId);
  if (!program) return "Today's checklist is ready.";
  const week = program.weeks[Math.min(3, Math.ceil(dayNumber / 7) - 1)] ?? program.weeks[0];
  return week.tasks.join(' · ');
}

/** Schedules (or replaces) the daily repeating reminder for one active program. */
export async function scheduleProgramReminder(started: StartedProgram, notificationsEnabled: boolean) {
  const identifier = idFor(started.id);
  await Notifications.cancelScheduledNotificationAsync(identifier).catch(() => {});
  if (!notificationsEnabled) return;

  const program = getProgram(started.id);
  if (!program) return;
  const [hourStr, minuteStr] = started.reminder.split(':');
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);
  if (Number.isNaN(hour) || Number.isNaN(minute)) return;

  const granted = await ensureNotificationPermission();
  if (!granted) return;

  const dayNumber = Math.min(28, started.done + 1);

  await Notifications.scheduleNotificationAsync({
    identifier,
    content: {
      title: program.name,
      body: `DAY ${dayNumber}/28 · ${taskListFor(started.id, dayNumber)}`,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    },
  });
}

export async function cancelProgramReminder(programId: string) {
  await Notifications.cancelScheduledNotificationAsync(idFor(programId)).catch(() => {});
}

/** Reschedules every active program's reminder — call after settings/state changes that affect timing or content. */
export async function resyncAllReminders(started: StartedProgram[], notificationsEnabled: boolean) {
  if (!notificationsEnabled) {
    await Notifications.cancelAllScheduledNotificationsAsync().catch(() => {});
    return;
  }
  for (const s of started) {
    await scheduleProgramReminder(s, true);
  }
}
