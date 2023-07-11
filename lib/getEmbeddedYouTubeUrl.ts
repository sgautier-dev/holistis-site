export function getEmbeddedYouTubeUrl(videoUrl: string): string | null {
	const youtubeRegex =
		/^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+).*$/;
	const match = videoUrl.match(youtubeRegex);

	if (match) {
		const videoId = match[1];
		return `https://www.youtube-nocookie.com/embed/${videoId}?controls=0&modestbranding=1`;
	}

	return null;
}
