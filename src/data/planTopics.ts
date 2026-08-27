import type { TranslationKey } from '../lib/i18n';

/** Plain-language framing for each program when it shows up inside the merged daily plan —
 * deliberately common words ("Peau", "Sommeil") instead of the catalog's own branded name
 * ("Skin Clarity Reset") or its anatomy jargon ("Système circadien"). */
export const PLAN_TOPIC: Record<string, { labelKey: TranslationKey; descKey: TranslationKey }> = {
  'face-structure': { labelKey: 'topic_face_structure', descKey: 'topic_desc_face_structure' },
  jawmaxing: { labelKey: 'topic_jaw', descKey: 'topic_desc_jaw' },
  'hunter-eyes': { labelKey: 'topic_eyes', descKey: 'topic_desc_eyes' },
  skinmaxing: { labelKey: 'topic_proportions', descKey: 'topic_desc_proportions' },
  'skin-clarity': { labelKey: 'topic_skin', descKey: 'topic_desc_skin' },
  posture: { labelKey: 'topic_posture', descKey: 'topic_desc_posture' },
  bodymaxing: { labelKey: 'topic_physique', descKey: 'topic_desc_physique' },
  sleep: { labelKey: 'topic_sleep', descKey: 'topic_desc_sleep' },
  hydration: { labelKey: 'topic_hydration', descKey: 'topic_desc_hydration' },
};

/** One accent color per topic so a step reads as "which subject" at a glance, without having to
 * read the badge text — used at low opacity for the badge background/icon and works in both
 * light and dark mode since it's blended over the surface rather than a flat fill. */
export const PLAN_TOPIC_COLOR: Record<string, string> = {
  'face-structure': '#6366F1',
  jawmaxing: '#3B82F6',
  'hunter-eyes': '#06B6D4',
  skinmaxing: '#14B8A6',
  'skin-clarity': '#EC4899',
  posture: '#F97316',
  bodymaxing: '#22C55E',
  sleep: '#8B5CF6',
  hydration: '#0EA5E9',
};
