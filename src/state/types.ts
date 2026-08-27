export type Sex = 'M' | 'F';
export type Language = 'en' | 'fr';
export type Theme = 'light' | 'dark';

export interface Profile {
  name: string;
  sex: Sex;
  age: number;
  height: number; // cm
  weight: number; // kg
  since: string; // "JUL 2026"
}

export interface StartedProgram {
  id: string;
  done: number; // days completed, 0-28
  checks: Record<number, boolean>; // today's task checkmarks, keyed by task index
  reminder: string; // "HH:MM", 24h
  /** "YYYY-MM-DD HH:MM" of the last time this program's reminder actually fired —
   * dedupes the in-browser reminder poll (see lib/notifications.ts) so it only fires once. */
  lastRem?: string;
}

/** The user's single active 4-week plan — a bundle of programs (started together, in lockstep)
 * built from their weakest scan metrics. Progress/checks still live on each StartedProgram; this
 * just records which ones belong to the plan and which scan it was built from. */
export interface ActivePlan {
  programIds: string[];
  scanId: string;
  startedAt: string; // "YYYY-MM-DD"
}

export interface ScanMetrics {
  sym: number;
  jaw: number;
  canthal: number;
  cheek: number;
  eye: number;
  prop: number;
  skin: number;
}

export interface ScanEntry {
  id: string;
  date: string; // "JUL 05"
  title: string;
  overall: number;
  thumb: string | null;
  m: ScanMetrics;
}

export interface Settings {
  notifications: boolean;
  haptics: boolean;
  grid: boolean;
  private: boolean;
}

/** Self-reported habits, collected once during onboarding — the counterpart to ScanMetrics
 * for everything a camera can't measure. Same 0-100 scale, so both pools sort together when
 * picking the weakest areas to build a plan around. */
export interface Lifestyle {
  posture: number;
  physique: number;
  sleep: number;
  hydration: number;
}

export const DEFAULT_LIFESTYLE: Lifestyle = { posture: 70, physique: 70, sleep: 70, hydration: 70 };

export const DEFAULT_PROFILE: Profile = {
  name: '',
  sex: 'M',
  age: 24,
  height: 178,
  weight: 72,
  since: '',
};

export const DEFAULT_SETTINGS: Settings = {
  notifications: true,
  haptics: true,
  grid: false,
  private: true,
};
