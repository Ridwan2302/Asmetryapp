import { useCallback, useEffect } from 'react';
import { useAppStore } from '@/state/store';
import { Language } from './i18n';

/** App-wide voice guidance: reads text aloud with the browser's native SpeechSynthesis (no API
 * key, works offline, supports fr-FR/en-US). Gated by the settings.voiceGuide toggle. */

export function voiceSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

function langCode(lang: Language): string {
  return lang === 'fr' ? 'fr-FR' : 'en-US';
}

export function speak(text: string, lang: Language) {
  if (!voiceSupported() || !text) return;
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = langCode(lang);
    utter.rate = 1;
    window.speechSynthesis.speak(utter);
  } catch {
    // Some browsers (notably older iOS Safari) throw on edge cases here — voice guidance is a
    // nice-to-have, so fail silently rather than breaking the screen that triggered it.
  }
}

export function stopSpeaking() {
  if (voiceSupported()) window.speechSynthesis.cancel();
}

/** Speaks `text` in the app's current language, only when the voice-guide setting is on.
 * Use for one-off reads (button taps). For auto-read-on-mount, use useAutoSpeak. */
export function useSpeak() {
  const language = useAppStore((s) => s.language);
  const enabled = useAppStore((s) => s.settings.voiceGuide);
  return useCallback(
    (text: string) => {
      if (!enabled) return;
      speak(text, language);
    },
    [enabled, language]
  );
}

/** Speaks `text` automatically whenever it (or the language/setting) changes — for screens that
 * should narrate themselves as the user arrives (onboarding steps, coach messages, results). */
export function useAutoSpeak(text: string) {
  const language = useAppStore((s) => s.language);
  const enabled = useAppStore((s) => s.settings.voiceGuide);
  useEffect(() => {
    if (!enabled || !text) return;
    speak(text, language);
  }, [enabled, language, text]);
}
