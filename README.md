# Asmetry

A Next.js (App Router, TypeScript, Tailwind v4) web app implementation of the Asmetry facial-analysis / looksmaxing design handoff. Deploys to Vercel with zero config.

## Running it

```bash
npm install
npm run dev
```

Camera access (`getUserMedia`) requires HTTPS or `localhost` — both work out of the box in dev and on Vercel.

## Architecture

- **Routing**: `src/app/` — App Router. `(tabs)` route group holds the 5 main tabs (no `/tabs` in the URL); `/program/[id]` and `/edit-stats` are pushed full-screen routes outside the tab bar.
- **State**: `src/state/store.ts` — Zustand persisted to `localStorage`, mirroring the design's `asmetry_state_v2` shape (profile, started programs, scans, settings). Hydration is gated (`Providers.tsx`) to avoid SSR/client mismatches.
- **Data**: `src/data/programs.ts` — the 11 programs ported verbatim from the handoff's `programs.js`.
- **Design tokens**: `src/app/globals.css` (`@theme` block) — Warm Paper palette, Cormorant Garamond (display) + Montserrat (UI/body, standing in for Gotham per the handoff), loaded via `next/font/google`.
- **Face analysis**: `src/lib/faceAnalysis.ts` — real analysis, not mocked, entirely client-side:
  - Symmetry, jawline taper, canthal tilt, cheekbone prominence, under-eye puffiness, and facial-thirds proportion are computed from a real **MediaPipe FaceLandmarker** mesh (`@mediapipe/tasks-vision`, runs in-browser via WASM) run on the captured photo — geometry, not random numbers.
  - Skin clarity is computed from actual pixel data read straight off a `<canvas>` (`getImageData`) for two cheek patches, scored from real luminance variance.
  - The WASM runtime is self-hosted in `public/mediapipe/wasm/` (no CDN dependency at runtime); the `.task` model file is fetched from Google's official MediaPipe model host on first use.
  - Every metric has a documented, deterministic fallback if a signal is missing — never a random placeholder.
- **Camera**: `getUserMedia` + `<canvas>` capture (mirrored preview, matching the original design prototype's own approach), with a file-upload fallback (`capture="user"` hints mobile browsers to open the front camera).
- **Notifications**: `src/lib/notifications.ts` — best-effort browser `Notification` API, polled every 15s while any tab is open. **Not** reliable once every tab/browser is fully closed — that needs a Web Push backend (VAPID keys + a server holding subscriptions), which is out of scope for a static/serverless deploy. See below.

## Known limitation: reminders

Browsers have no equivalent of a mobile OS's "fire a local notification even when the app is closed." What's shipped: `Notification` permission + an in-app poll that fires reminders while any tab is open (backgrounded tabs are fine — closed tabs are not). If you want true closed-browser delivery later, that requires:
1. A backend to store push subscriptions (e.g. a small DB + a couple of Vercel serverless functions).
2. VAPID keys and the Web Push protocol.
3. A cron trigger (e.g. Vercel Cron) to check due reminders and push them.

## Known deviations from the design reference (intentional)

- **Seed data removed.** The prototype ships with 3 fake sample scans and 2 pre-started programs for a non-empty first look. This build ships empty (`scans: []`, `started: []`) with real empty states for Home/Progress instead — matching "data stays on device" and not fabricating a user's history.
- **Hormonal Optimization Diet has a hero image** even though the original `programs.js` didn't reference one — a `hormonal.png` was included in the asset bundle but never wired in. Sleep and Hydration still have no photo and fall back to the code-drawn SVG plates, same as the reference.
- **Gotham not included.** Montserrat is used everywhere per the handoff's own fallback instruction; swap in licensed Gotham if/when available.

## Directory map

```
src/app/                  Next.js App Router pages
src/components/           shared UI primitives
src/data/                 programs.ts, metric→program mapping
src/lib/                  calc, face analysis, notifications, haptics
src/screens/              multi-step onboarding flow, program detail
src/state/                zustand store + types
public/images/            ported design assets
public/mediapipe/wasm/    self-hosted MediaPipe WASM runtime
```
