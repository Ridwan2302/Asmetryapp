import { useAppStore } from '../state/store';

/** Vibration API tap feedback, gated by the "Haptic feedback" setting. Silently does nothing
 * on platforms without navigator.vibrate (notably iOS Safari). */
export function tapHaptic() {
  if (typeof navigator === 'undefined' || !navigator.vibrate) return;
  if (useAppStore.getState().settings.haptics) {
    navigator.vibrate(10);
  }
}
