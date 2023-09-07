import { getEmbeddedYouTubeUrl } from "@/lib/getEmbeddedYouTubeUrl";

describe("getEmbeddedYouTubeUrl", () => {
	it("should return the embedded YouTube URL with controls and modest branding when given a valid YouTube URL with a video ID", () => {
		const videoUrl = "https://www.youtube.com/watch?v=abcd123456-";
		const expectedUrl =
			"https://www.youtube-nocookie.com/embed/abcd123456-?controls=1&modestbranding=1";

		expect(getEmbeddedYouTubeUrl(videoUrl)).toBe(expectedUrl);
	});

	it("should return null when given a valid YouTube URL without a video ID", () => {
		const videoUrl = "https://www.youtube.com/watch";
		expect(getEmbeddedYouTubeUrl(videoUrl)).toBeNull();
	});

	it("should return null when given an invalid URL", () => {
		const videoUrl = "invalid-url";
		expect(getEmbeddedYouTubeUrl(videoUrl)).toBeNull();
	});

	it("should return null when given a non-YouTube URL", () => {
		const videoUrl = "https://www.example.com";
		expect(getEmbeddedYouTubeUrl(videoUrl)).toBeNull();
	});

	it("should return null when given a YouTube URL with an invalid video ID", () => {
		const videoUrl = "https://www.youtube.com/watch?v=invalid";
		expect(getEmbeddedYouTubeUrl(videoUrl)).toBeNull();
	});

	it("should return null when given an empty string", () => {
		const videoUrl = "";
		expect(getEmbeddedYouTubeUrl(videoUrl)).toBeNull();
	});
});
