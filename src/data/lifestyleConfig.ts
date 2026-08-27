import type { TranslationKey } from '../lib/i18n';
import type { Lifestyle } from '../state/types';

export interface LifestyleMetricConfig {
  key: keyof Lifestyle;
  labelKey: TranslationKey;
  programId: string;
  noteKeys: [TranslationKey, TranslationKey, TranslationKey]; // [strong, mid, weak]
}

/** Self-reported counterpart to METRIC_CONFIG (data/metricConfig.ts) — same 0-100 scale and
 * [strong, mid, weak] note shape, so both pools sort together when a plan is built. */
export const LIFESTYLE_METRIC_CONFIG: LifestyleMetricConfig[] = [
  { key: 'posture', labelKey: 'lifestyle_posture_label', programId: 'posture', noteKeys: ['lifestyle_posture_note_0', 'lifestyle_posture_note_1', 'lifestyle_posture_note_2'] },
  { key: 'physique', labelKey: 'lifestyle_physique_label', programId: 'bodymaxing', noteKeys: ['lifestyle_physique_note_0', 'lifestyle_physique_note_1', 'lifestyle_physique_note_2'] },
  { key: 'sleep', labelKey: 'lifestyle_sleep_label', programId: 'sleep', noteKeys: ['lifestyle_sleep_note_0', 'lifestyle_sleep_note_1', 'lifestyle_sleep_note_2'] },
  { key: 'hydration', labelKey: 'lifestyle_hydration_label', programId: 'hydration', noteKeys: ['lifestyle_hydration_note_0', 'lifestyle_hydration_note_1', 'lifestyle_hydration_note_2'] },
];

/** Maps a 0-4 answer index (worst to best) to the same 0-100 scale as face metrics. */
export function lifestyleScoreFromIndex(index: number): number {
  return 20 + index * 20;
}
