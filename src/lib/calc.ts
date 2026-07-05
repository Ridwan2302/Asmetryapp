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
