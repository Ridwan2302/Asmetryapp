import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { dateStr, monthYear } from '../lib/calc';
import { ActivePlan, DEFAULT_PROFILE, DEFAULT_SETTINGS, Language, Profile, ScanEntry, Settings, StartedProgram, Theme } from './types';

interface AppState {
  hasHydrated: boolean;
  onboarded: boolean;
  profile: Profile;
  profilePic: string | null;
  started: StartedProgram[];
  plan: ActivePlan | null;
  scans: ScanEntry[];
  settings: Settings;
  language: Language;
  theme: Theme;

  setHasHydrated: (v: boolean) => void;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  completeOnboarding: (profile: Profile) => void;
  updateProfile: (profile: Profile) => void;
  setProfilePic: (uri: string | null) => void;

  isStarted: (id: string) => boolean;
  toggleProgram: (id: string) => void;
  toggleTask: (id: string, taskIndex: number) => void;
  logDay: (id: string) => void;
  restartProgram: (id: string) => void;
  setReminder: (id: string, time: string) => void;
  markReminderFired: (id: string, key: string) => void;

  startPlan: (programIds: string[], scanId: string) => void;
  clearPlan: () => void;
  logPlanDay: (programIds: string[]) => void;
  restartPlan: (programIds: string[]) => void;

  addScan: (entry: ScanEntry) => void;
  deleteScan: (id: string) => void;
  toggleSetting: (id: keyof Settings) => void;
  resetApp: () => void;
}

const initialState = {
  hasHydrated: false,
  onboarded: false,
  profile: DEFAULT_PROFILE,
  profilePic: null,
  started: [] as StartedProgram[],
  plan: null as ActivePlan | null,
  scans: [] as ScanEntry[],
  settings: DEFAULT_SETTINGS,
  language: 'en' as Language,
  theme: 'light' as Theme,
};

const noopStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setHasHydrated: (v) => set({ hasHydrated: v }),
      setLanguage: (lang) => set({ language: lang }),
      setTheme: (theme) => set({ theme }),

      completeOnboarding: (profile) =>
        set({ onboarded: true, profile: { ...profile, since: profile.since || monthYear() } }),

      updateProfile: (profile) => set({ profile }),

      setProfilePic: (uri) => set({ profilePic: uri }),

      isStarted: (id) => get().started.some((s) => s.id === id),

      toggleProgram: (id) =>
        set((state) => {
          if (state.started.some((s) => s.id === id)) {
            return { started: state.started.filter((s) => s.id !== id) };
          }
          return {
            started: [
              ...state.started,
              { id, done: 0, checks: {}, reminder: '08:00' },
            ],
          };
        }),

      toggleTask: (id, taskIndex) =>
        set((state) => ({
          started: state.started.map((s) =>
            s.id === id ? { ...s, checks: { ...s.checks, [taskIndex]: !s.checks[taskIndex] } } : s
          ),
        })),

      logDay: (id) =>
        set((state) => ({
          started: state.started.map((s) => (s.id === id ? { ...s, done: Math.min(28, s.done + 1), checks: {} } : s)),
        })),

      restartProgram: (id) =>
        set((state) => ({
          started: state.started.map((s) => (s.id === id ? { ...s, done: 0, checks: {} } : s)),
        })),

      setReminder: (id, time) =>
        set((state) => ({
          started: state.started.map((s) => (s.id === id ? { ...s, reminder: time } : s)),
        })),

      markReminderFired: (id, key) =>
        set((state) => ({
          started: state.started.map((s) => (s.id === id ? { ...s, lastRem: key } : s)),
        })),

      startPlan: (programIds, scanId) =>
        set((state) => {
          const newlyStarted = programIds
            .filter((id) => !state.started.some((s) => s.id === id))
            .map((id): StartedProgram => ({ id, done: 0, checks: {}, reminder: '08:00' }));
          return {
            started: [...state.started, ...newlyStarted],
            plan: { programIds, scanId, startedAt: dateStr() },
          };
        }),

      clearPlan: () => set({ plan: null }),

      logPlanDay: (programIds) =>
        set((state) => ({
          started: state.started.map((s) => (programIds.includes(s.id) ? { ...s, done: Math.min(28, s.done + 1), checks: {} } : s)),
        })),

      restartPlan: (programIds) =>
        set((state) => ({
          started: state.started.map((s) => (programIds.includes(s.id) ? { ...s, done: 0, checks: {} } : s)),
        })),

      addScan: (entry) => set((state) => ({ scans: [...state.scans, entry] })),

      deleteScan: (id) => set((state) => ({ scans: state.scans.filter((s) => s.id !== id) })),

      toggleSetting: (id) =>
        set((state) => ({ settings: { ...state.settings, [id]: !state.settings[id] } })),

      resetApp: () => set({ ...initialState, hasHydrated: true }),
    }),
    {
      name: 'asmetry_state_v2',
      // Skip auto-hydration: the store module also evaluates during SSR/build where
      // `localStorage` doesn't exist. Providers.tsx calls `.persist.rehydrate()` itself
      // once mounted on the client, and gates rendering on `hasHydrated`.
      skipHydration: true,
      storage: createJSONStorage(() => (typeof window === 'undefined' ? noopStorage : window.localStorage)),
      partialize: (state) => ({
        onboarded: state.onboarded,
        profile: state.profile,
        profilePic: state.profilePic,
        started: state.started,
        plan: state.plan,
        scans: state.scans,
        settings: state.settings,
        language: state.language,
        theme: state.theme,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
