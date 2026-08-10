/** Builds a YouTube search-results URL with the query already filled in — used as a fallback when no curated demo video matches. */
export function youtubeSearchUrl(query: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

/** Builds a direct watch-page URL for a curated video id — opened externally (YouTube app or site)
 * rather than embedded, so playback issues are YouTube's own page to handle, not ours. */
export function youtubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

/** Thumbnail image for a video id, used for the "watch on YouTube" button preview. */
export function youtubeThumbnailUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
