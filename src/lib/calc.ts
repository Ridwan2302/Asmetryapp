import type { Translator } from './i18n';

export function bmiOf(heightCm: number, weightKg: number): number {
  const m = heightCm / 100;
  return m > 0 ? weightKg / (m * m) : 0;
}

export function bmiCategory(bmi: number, t: Translator): string {
  if (bmi < 18.5) return t('bmi_underweight');
  if (bmi < 25) return t('bmi_healthy');
  if (bmi < 30) return t('bmi_overweight');
  return t('bmi_high');
}

export function bmiAdvice(bmi: number, t: Translator): string {
  if (bmi < 18.5) return t('bmi_advice_under');
  if (bmi < 25) return t('bmi_advice_healthy');
  return t('bmi_advice_high');
}

export function band(v: number, t: Translator): string {
  if (v >= 90) return t('band_excellent');
  if (v >= 80) return t('band_strong');
  if (v >= 70) return t('band_good');
  if (v >= 60) return t('band_fair');
  return t('band_develop');
}

export function gradeOf(v: number, t: Translator): string {
  if (v >= 90) return t('grade_exceptional');
  if (v >= 80) return t('grade_strong');
  if (v >= 70) return t('grade_developing');
  if (v >= 60) return t('grade_baseline');
  return t('grade_foundational');
}

export function clamp(v: number, min = 50, max = 96): number {
  return Math.max(min, Math.min(max, v));
}

export function dateStr(d: Date = new Date()): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase();
}

export function monthYear(d: Date = new Date()): string {
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
}

/** "YYYY-MM-DD" in local time — unlike `dateStr`, this round-trips through real date math
 * (year included, no locale-dependent month name), so a plan's start date can be used to
 * compute which calendar date each of its 28 days actually falls on. */
export function isoDateStr(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function parseIsoDate(iso: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  const [, y, m, d] = match;
  return new Date(Number(y), Number(m) - 1, Number(d));
}

/** The ISO date `days` after `iso`, or null if `iso` isn't a valid "YYYY-MM-DD" (e.g. a plan
 * started before this field was switched from a display string to a real date). */
export function addDaysIso(iso: string, days: number): string | null {
  const base = parseIsoDate(iso);
  if (!base) return null;
  base.setDate(base.getDate() + days);
  return isoDateStr(base);
}

/** Whole calendar days between `iso` and today (local time), or null if `iso` is invalid. */
export function daysSinceIso(iso: string): number | null {
  const base = parseIsoDate(iso);
  if (!base) return null;
  const today = new Date();
  const a = new Date(base.getFullYear(), base.getMonth(), base.getDate()).getTime();
  const b = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  return Math.round((b - a) / 86400000);
}

/** Day-of-month for an ISO date, or null if invalid — for compact calendar cells ("28"). */
export function calendarDayOfMonth(iso: string): number | null {
  return parseIsoDate(iso)?.getDate() ?? null;
}

/** "28 août" / "Aug 28" for an ISO date, or null if invalid. */
export function shortCalendarDate(iso: string, lang: 'en' | 'fr'): string | null {
  const d = parseIsoDate(iso);
  if (!d) return null;
  return d.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'short' });
}

export function greeting(t: Translator, d: Date = new Date()): string {
  const h = d.getHours();
  if (h < 12) return t('greeting_morning');
  if (h < 18) return t('greeting_afternoon');
  return t('greeting_evening');
}

export function summaryFor(overall: number, t: Translator): string {
  if (overall >= 82) return t('summary_high');
  if (overall >= 74) return t('summary_mid');
  return t('summary_low');
}

/** "▲ +5 VS PRIOR" / "▼ 3 VS PRIOR" — matches the design's exact sign/arrow formatting. */
export function deltaVsPrior(delta: number, t: Translator): string {
  return (delta >= 0 ? '▲ +' : '▼ ') + Math.abs(delta) + ' ' + t('vs_prior');
}

/** "+4" / "-2" / "0" */
export function signedDelta(delta: number): string {
  return (delta >= 0 ? '+' : '') + delta;
}

export function deltaColorClass(delta: number): string {
  if (delta > 0) return 'text-success';
  if (delta < 0) return 'text-negative';
  return 'text-soft';
}
