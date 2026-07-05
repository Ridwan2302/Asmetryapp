# Asmetry

React Native (Expo SDK 57) implementation of the Asmetry facial-analysis / looksmaxing app, built from the design handoff. File-based routing via `expo-router`.

## Running it

This app uses native modules (camera, ML Kit face detection, native time picker, image manipulation) that **do not run in Expo Go**. You need a custom dev client:

```bash
npm install
npx expo prebuild
npx expo run:ios      # or: npx expo run:android
```

For subsequent runs, `npx expo start --dev-client` is enough once the dev client is installed on the simulator/device.

## Architecture

- **Routing**: `app/` — `(onboarding)` group for first-run flow, `(tabs)` for the 5 main tabs, `program/[id]` and `edit-stats` as pushed full-screen routes.
- **State**: `src/state/store.ts` — Zustand + AsyncStorage persistence, mirroring the design's `asmetry_state_v2` shape (profile, started programs, scans, settings).
- **Data**: `src/data/programs.ts` — the 11 programs ported verbatim from `programs.js`.
- **Design tokens**: `src/theme/tokens.ts` — Warm Paper palette, Cormorant Garamond (display) + Montserrat (UI/body, standing in for Gotham per the handoff).
- **Face analysis**: `src/lib/faceAnalysis.ts` — real analysis, not mocked:
  - Symmetry, jawline taper, canthal tilt, cheekbone prominence, under-eye puffiness, and facial-thirds proportion are all computed from `@react-native-ml-kit/face-detection` landmarks/contours on the captured photo (geometry, not random numbers).
  - Skin clarity is computed from actual pixel data: two cheek patches are cropped via `expo-image-manipulator`, decoded with a small in-repo PNG parser (`src/lib/pngPixels.ts`, zlib inflate via `pako`), and scored from real luminance variance.
  - Every metric has a documented, deterministic fallback if a signal is missing — never a random placeholder.
- **Notifications**: `src/lib/notifications.ts` — real OS-level daily-repeating local notifications per active program (`expo-notifications`), rescheduled on time/day/setting changes and resynced on app start.

## Known deviations from the design reference (intentional)

- **Seed data removed.** The prototype ships with 3 fake sample scans and 2 pre-started programs for a non-empty first look. This build ships empty (`scans: []`, `started: []`) and has real empty states for Home/Progress instead — matching "data stays on device" and not fabricating a user's history. (The README's own suggestion.)
- **`assets/images/onboarding/welcome-hero.png` is a placeholder.** The upload bundle didn't include `welcome-hero.png` (used for the welcome hero and the 3rd intro slide); it's currently a copy of `intro-scan.png`. Swap in the real asset before shipping.
- **Hormonal Optimization Diet now has a hero image** (`hormonal.png` was included in this asset bundle but wasn't wired into `programs.js`). Sleep and Hydration still have no photo and fall back to the code-drawn SVG plates, same as the reference.
- **Gotham not included.** Montserrat is used everywhere per the handoff's own fallback instruction; swap in licensed Gotham if/when available.
- **No in-app reminder banner.** The prototype's banner only fired while the app was open; it's fully replaced by real OS notifications, which is what the handoff asked for.

## Directory map

```
app/                      expo-router screens
src/components/           shared UI primitives
src/data/                 programs.ts, metric→program mapping
src/lib/                  calc, face analysis, notifications, media, haptics
src/screens/onboarding/   the multi-step onboarding flow component
src/state/                zustand store + types
src/theme/                design tokens
assets/images/            ported design assets
```
