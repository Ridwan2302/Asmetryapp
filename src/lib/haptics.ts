import * as Haptics from 'expo-haptics';
import { useAppStore } from '../state/store';

/** Fires selection haptic feedback, gated by the user's "Haptic feedback" setting. */
export function tapHaptic() {
  if (useAppStore.getState().settings.haptics) {
    Haptics.selectionAsync().catch(() => {});
  }
}
