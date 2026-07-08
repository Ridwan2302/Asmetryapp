/** Builds a YouTube search-results URL with the query already filled in — used as a fallback when no curated demo video matches. */
export function youtubeSearchUrl(query: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

/** Builds an embeddable YouTube URL for a specific curated video, forced to English audio/interface. */
export function youtubeEmbedUrl(videoId: string): string {
  const params = new URLSearchParams({
    hl: 'en',
    cc_lang_pref: 'en',
    modestbranding: '1',
    rel: '0',
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}
