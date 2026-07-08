/** Curated real YouTube video per recurring exercise/routine, matched by keyword against the (always-English) task text. */
const DEMO_VIDEOS: { keywords: string[]; videoId: string }[] = [
  { keywords: ['mewing'], videoId: 'YoKy55QNivQ' },
  { keywords: ['cheekbone', 'buccal'], videoId: 'KxKijURpcQA' },
  { keywords: ['gua sha', 'lymphatic', 'drainage', 'facial massage'], videoId: 'lxlU0Fh5RAo' },
  { keywords: ['cold-water', 'cold water', 'cold compress', 'cold immersion'], videoId: '0vYy3GKOa0w' },
  { keywords: ['gum', 'clench', 'masseter'], videoId: 'WgNeY1fnOIE' },
  { keywords: ['canthal', 'squint', 'orbital', 'hunter eye'], videoId: 'fybOjy_OsLQ' },
  { keywords: ['chin tuck'], videoId: 'gIBoxQ6AlS0' },
  { keywords: ['wall angel', 'thoracic', 'doorway stretch'], videoId: '1UU4VvklQ44' },
  { keywords: ['face pull', 'band pull-apart'], videoId: 'eTCBSFlCJ_s' },
  { keywords: ['cleanse', 'spf', 'retinoid', 'niacinamide', 'moisturiz', 'exfoliat'], videoId: '-Jt3gczy_4o' },
  { keywords: ['brow clean', 'brow maintenance'], videoId: 'SkCQaMQnrlw' },
  { keywords: ['beard', 'shave line'], videoId: 'paUSXWMboxM' },
  { keywords: ['wind-down', 'screens off'], videoId: 'nlPOgN7ZGc8' },
  { keywords: ['lateral raise'], videoId: 'nnH63icHYXY' },
  { keywords: ['vacuum'], videoId: '5ygAHVvbvJE' },
  { keywords: ['push session', 'overhead press'], videoId: 'OhOdvjKCvr0' },
  { keywords: ['pull session'], videoId: 'Sc8rL8sK7zE' },
];

/** Returns a curated video id for a task's English text, or null if nothing matches (caller should fall back to search). */
export function findDemoVideoId(taskEn: string): string | null {
  const lower = taskEn.toLowerCase();
  for (const entry of DEMO_VIDEOS) {
    if (entry.keywords.some((k) => lower.includes(k))) return entry.videoId;
  }
  return null;
}
