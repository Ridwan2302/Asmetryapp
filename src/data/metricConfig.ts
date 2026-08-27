import type { Translator, TranslationKey } from '../lib/i18n';
import type { ScanMetrics } from '../state/types';

export interface MetricConfig {
  key: keyof ScanMetrics;
  labelKey: TranslationKey;
  programId: string;
  noteKeys: [TranslationKey, TranslationKey, TranslationKey]; // [strong, mid, weak]
}

/** Ported verbatim from the design reference's METRIC table (metric label, mapped program, banded notes). */
export const METRIC_CONFIG: MetricConfig[] = [
  { key: 'sym', labelKey: 'metric_sym_label', programId: 'face-structure', noteKeys: ['metric_sym_note_0', 'metric_sym_note_1', 'metric_sym_note_2'] },
  { key: 'jaw', labelKey: 'metric_jaw_label', programId: 'jawmaxing', noteKeys: ['metric_jaw_note_0', 'metric_jaw_note_1', 'metric_jaw_note_2'] },
  { key: 'canthal', labelKey: 'metric_canthal_label', programId: 'hunter-eyes', noteKeys: ['metric_canthal_note_0', 'metric_canthal_note_1', 'metric_canthal_note_2'] },
  { key: 'cheek', labelKey: 'metric_cheek_label', programId: 'face-structure', noteKeys: ['metric_cheek_note_0', 'metric_cheek_note_1', 'metric_cheek_note_2'] },
  { key: 'eye', labelKey: 'metric_eye_label', programId: 'hunter-eyes', noteKeys: ['metric_eye_note_0', 'metric_eye_note_1', 'metric_eye_note_2'] },
  { key: 'prop', labelKey: 'metric_prop_label', programId: 'skinmaxing', noteKeys: ['metric_prop_note_0', 'metric_prop_note_1', 'metric_prop_note_2'] },
  { key: 'skin', labelKey: 'metric_skin_label', programId: 'skin-clarity', noteKeys: ['metric_skin_note_0', 'metric_skin_note_1', 'metric_skin_note_2'] },
];

/** Shared by face metrics and lifestyle answers alike — both use the same 0-100 scale and
 * the same [strong, mid, weak] note-key shape. */
export function noteForBand(noteKeys: [TranslationKey, TranslationKey, TranslationKey], value: number, t: Translator): string {
  const idx = value >= 80 ? 0 : value >= 65 ? 1 : 2;
  return t(noteKeys[idx]);
}

export function metricNoteFor(m: MetricConfig, value: number, t: Translator): string {
  return noteForBand(m.noteKeys, value, t);
}
