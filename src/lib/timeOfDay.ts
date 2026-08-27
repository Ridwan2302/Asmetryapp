export type DayMoment = 'wake_up' | 'morning' | 'afternoon' | 'anytime' | 'evening' | 'before_bed' | 'twice_daily';

/** Match against the English task text (stable across languages) rather than the localized
 * copy — task copy consistently marks real time-of-day cues in English ("AM:", "before bed",
 * "on waking"), where the French translation doesn't always repeat the same literal marker. */
const TWICE_DAILY_PHRASE = /\bAM\s*\/\s*PM\b|\bAM\s*\+\s*PM\b/;
const AM_TOKEN = /\bAM\b/;
const PM_TOKEN = /\bPM\b/;

// Ordered from most to least specific within each half of the day: a literal "the moment you
// wake up" / "right before sleep" cue beats a generic "sometime in the morning/evening" one.
const WAKE_UP_WORDS = /\bon waking\b|\bupon waking\b|\bwake time\b|\bfixed wake\b|\bwaking\b(?!\s+hour)/i;
const MORNING_WORDS = /\bmorning\b|\bsunrise\b|\bbreakfast\b/i;
const AFTERNOON_WORDS = /\bafternoon\b|\bmidday\b|\bnoon\b|after\s+\d{1,2}\s*pm/i;
const BEFORE_BED_WORDS = /\bbed(time)?\b|\bwind-?down\b|\bsleeping\b/i;
const EVENING_WORDS = /\bevening\b|\bsunset\b|\bnight/i;

/** Best-effort guess at when in the day a task belongs — most exercise/nutrition tasks genuinely
 * have no fixed moment and correctly fall through to 'anytime'; only tasks with an explicit cue
 * get pinned to a specific part of the day, and the more precise cue wins over a vaguer one
 * (e.g. "on waking" resolves to wake_up, not the more generic morning). */
export function inferMoment(enTask: string): DayMoment {
  if (TWICE_DAILY_PHRASE.test(enTask)) return 'twice_daily';

  const isWakeUp = WAKE_UP_WORDS.test(enTask);
  const isMorning = isWakeUp || AM_TOKEN.test(enTask) || MORNING_WORDS.test(enTask);
  const isBeforeBed = BEFORE_BED_WORDS.test(enTask);
  const isEvening = isBeforeBed || PM_TOKEN.test(enTask) || EVENING_WORDS.test(enTask);

  if (isMorning && isEvening) return 'twice_daily';
  if (isWakeUp) return 'wake_up';
  if (isMorning) return 'morning';
  if (isBeforeBed) return 'before_bed';
  if (isEvening) return 'evening';
  if (AFTERNOON_WORDS.test(enTask)) return 'afternoon';
  return 'anytime';
}

/** Chronological bucket order for a merged, multi-program day. */
export const MOMENT_ORDER: DayMoment[] = ['wake_up', 'morning', 'twice_daily', 'afternoon', 'anytime', 'evening', 'before_bed'];

/** The hour (24h, local time) at which a moment's steps unlock — buckets absent from this map
 * (anytime, twice_daily) are never locked, since they're either flexible by nature or need
 * attention at both ends of the day anyway. */
export const MOMENT_UNLOCK_HOUR: Partial<Record<DayMoment, number>> = {
  wake_up: 5,
  morning: 8,
  afternoon: 12,
  evening: 17,
  before_bed: 21,
};

export function isMomentUnlocked(moment: DayMoment, hour: number): boolean {
  const unlockHour = MOMENT_UNLOCK_HOUR[moment];
  return unlockHour == null || hour >= unlockHour;
}

/** "17h00" / "5:00 PM" — for telling someone when a locked step actually becomes available. */
export function formatUnlockHour(hour: number, lang: 'en' | 'fr'): string {
  if (lang === 'fr') return `${hour}h00`;
  const suffix = hour < 12 ? 'AM' : 'PM';
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${h12}:00 ${suffix}`;
}
