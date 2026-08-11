/** Builds a YouTube search-results URL with the query already filled in — used as a fallback when no curated demo video matches. */
export function youtubeSearchUrl(query: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

/** Thumbnail image for a video id, used as the click-to-play preview before the embed loads. */
export function youtubeThumbnailUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

/** Builds an embeddable YouTube URL for a curated video, played inline inside the app. Interface
 * language follows the app's current language. Starts muted — browsers block unmuted autoplay in
 * cross-origin iframes, so this is required for autoplay to actually fire; the player's own
 * controls let the viewer unmute. */
export function youtubeEmbedUrl(videoId: string, lang: 'en' | 'fr'): string {
  const params = new URLSearchParams({
    hl: lang,
    cc_lang_pref: lang,
    modestbranding: '1',
    rel: '0',
    autoplay: '1',
    mute: '1',
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}
