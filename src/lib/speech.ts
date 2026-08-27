import { useAppStore } from '@/state/store';

let currentAudio: HTMLAudioElement | null = null;
let currentController: AbortController | null = null;

/** Speaks a line of guidance aloud via the Gemini text-to-speech API (called server-side through
 * /api/speech — the API key never reaches the browser). Silently does nothing if voice guidance
 * is off in Settings, during SSR, or if nothing meaningful was passed in. A network/API failure
 * fails silently too, so a narration hiccup never blocks the guided flow itself. */
export function speak(text: string, lang: 'en' | 'fr') {
  if (!text) return;
  if (typeof window === 'undefined') return;
  if (!useAppStore.getState().settings.voice) return;

  stopSpeaking();
  const controller = new AbortController();
  currentController = controller;

  fetch('/api/speech', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, lang }),
    signal: controller.signal,
  })
    .then((res) => (res.ok ? res.blob() : null))
    .then((blob) => {
      if (!blob || controller.signal.aborted) return;
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      currentAudio = audio;
      audio.onended = () => URL.revokeObjectURL(url);
      audio.play().catch(() => {});
    })
    .catch(() => {});
}

/** Stops whatever is currently being read and cancels any narration still in flight — call this
 * when closing a guided flow so a stray sentence doesn't keep playing after the screen is gone. */
export function stopSpeaking() {
  currentController?.abort();
  currentController = null;
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.src = '';
    currentAudio = null;
  }
}
