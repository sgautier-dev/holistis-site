/*
Function: takes a video URL as input and returns the embedded YouTube URL for that video. 
If the input URL is not a valid YouTube URL or does not contain a video ID, it returns null.
*/
export function getEmbeddedYouTubeUrl(videoUrl: string): string | null {
	try {
		const url = new URL(videoUrl);

		// Check if the hostname is a youtube domain
		if (url.hostname === "youtube.com" || url.hostname === "www.youtube.com") {
			const videoId = url.searchParams.get("v");

			if (videoId) {
				return `https://www.youtube-nocookie.com/embed/${videoId}?controls=1&modestbranding=1`;
			}
		}
	} catch (e) {
		// Invalid URL
		return null;
	}

	// Valid URL but not a YouTube URL or without a video ID
	return null;
}
