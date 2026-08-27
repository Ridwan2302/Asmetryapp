export type DayMoment = 'morning' | 'anytime' | 'evening' | 'twice_daily';

/** Match against the English task text (stable across languages) rather than the localized
 * copy — task copy consistently marks real time-of-day cues in English ("AM:", "before bed",
 * "on waking"), where the French translation doesn't always repeat the same literal marker. */
const TWICE_DAILY_PHRASE = /\bAM\s*\/\s*PM\b|\bAM\s*\+\s*PM\b/;
const AM_TOKEN = /\bAM\b/;
const PM_TOKEN = /\bPM\b/;
const MORNING_WORDS = /\bmorning\b|\bwake\b|\bwaking\b(?!\s+hour)|\bsunrise\b/i;
const EVENING_WORDS = /\bevening\b|\bbed(time)?\b|\bwind-?down\b|\bsunset\b|night|\bsleeping\b/i;

/** Best-effort guess at when in the day a task belongs — most exercise/nutrition tasks genuinely
 * have no fixed moment and correctly fall through to 'anytime'; only tasks with an explicit
 * cue ("AM:", "before bed", twice-daily "AM/PM") get pinned to a specific part of the day. */
export function inferMoment(enTask: string): DayMoment {
  if (TWICE_DAILY_PHRASE.test(enTask)) return 'twice_daily';
  const morning = AM_TOKEN.test(enTask) || MORNING_WORDS.test(enTask);
  const evening = PM_TOKEN.test(enTask) || EVENING_WORDS.test(enTask);
  if (morning && evening) return 'twice_daily';
  if (morning) return 'morning';
  if (evening) return 'evening';
  return 'anytime';
}

/** Chronological bucket order for a merged, multi-program day: wake-up cues first, twice-daily
 * habits next (they set the tone for the whole day), flexible tasks in the middle, wind-down
 * cues last. */
export const MOMENT_ORDER: DayMoment[] = ['morning', 'twice_daily', 'anytime', 'evening'];
