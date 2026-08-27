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
