import type { ScanMetrics } from '../state/types';

export interface MetricConfig {
  key: keyof ScanMetrics;
  label: string;
  programId: string;
  notes: [string, string, string]; // [strong, mid, weak]
}

/** Ported verbatim from the design reference's METRIC table (metric label, mapped program, banded notes). */
export const METRIC_CONFIG: MetricConfig[] = [
  { key: 'sym', label: 'FACIAL SYMMETRY', programId: 'face-structure', notes: ['Left and right halves align closely.', 'Minor deviation along the vertical axis.', 'Noticeable imbalance — trainable.'] },
  { key: 'jaw', label: 'JAWLINE DEFINITION', programId: 'jawmaxing', notes: ['Sharp, well-defined gonial angle.', 'Moderate definition, room to sharpen.', 'Soft lower third — masseter focus.'] },
  { key: 'canthal', label: 'CANTHAL TILT', programId: 'hunter-eyes', notes: ['Positive upward tilt.', 'Near-neutral tilt.', 'Slightly negative — orbital work advised.'] },
  { key: 'cheek', label: 'CHEEKBONE PROMINENCE', programId: 'face-structure', notes: ['High, prominent zygomatic arch.', 'Balanced midface volume.', 'Flat midface — lift protocol.'] },
  { key: 'eye', label: 'UNDER-EYE CLARITY', programId: 'hunter-eyes', notes: ['Bright, low fluid retention.', 'Mild puffiness detected.', 'Visible under-eye fatigue.'] },
  { key: 'prop', label: 'FACIAL PROPORTION', programId: 'skinmaxing', notes: ['Thirds are well balanced.', 'Slight elongation of lower third.', 'Proportion imbalance in vertical thirds.'] },
  { key: 'skin', label: 'SKIN CLARITY', programId: 'skin-clarity', notes: ['Firm, even, clear tone.', 'Adequate tone, maintain.', 'Congestion / dullness detected.'] },
];
