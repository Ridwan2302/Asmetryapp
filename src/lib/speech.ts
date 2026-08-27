import { useAppStore } from '@/state/store';

/** Speaks a line of guidance aloud using the browser's built-in text-to-speech — no external
 * service, no API key. Silently does nothing if voice guidance is off in Settings, the browser
 * doesn't support speech synthesis (e.g. during SSR), or nothing meaningful was passed in. */
export function speak(text: string, lang: 'en' | 'fr') {
  if (!text) return;
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  if (!useAppStore.getState().settings.voice) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang === 'fr' ? 'fr-FR' : 'en-US';
  utterance.rate = 1;
  window.speechSynthesis.speak(utterance);
}

/** Stops whatever is currently being read — call this when closing a guided flow so a stray
 * sentence doesn't keep playing after the screen is gone. */
export function stopSpeaking() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
}
