import { getEmbeddedYouTubeUrl } from "@/lib/getEmbeddedYouTubeUrl";
import Image from "next/image";
const sanitizeUrl = require("@braintree/sanitize-url").sanitizeUrl;

type ResourceMediaProps = {
	mediaType: Resource["mediaType"];
	media: MediaContent;
	alt: Resource["alt"];
};

/*
Component: renders different types of media based on the mediaType prop. It handles video, image, web, document, and audio media types, and provides fallbacks for unsupported types.
*/
export default function ResourceMedia({
	mediaType,
	media,
	alt,
}: ResourceMediaProps) {
	const sanitizedMediaUrl = sanitizeUrl(media.mediaUrl);
	switch (mediaType) {
		case "video":
			if (sanitizedMediaUrl) {
				// Construct the embedded YouTube URL
				const embeddedUrl = sanitizeUrl(
					getEmbeddedYouTubeUrl(sanitizedMediaUrl)
				);

				if (embeddedUrl) {
					return (
						<iframe
							src={embeddedUrl}
							title="YouTube video player"
							allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							className="w-full aspect-video rounded-xl border border-orange"
						></iframe>
					);
				} else {
					return (
						<video
							controls
							className="w-full aspect-video rounded-xl border border-orange"
						>
							<source src={sanitizedMediaUrl} />
							Votre navigateur ne prend pas en charge le lecteur vidéo.
						</video>
					);
				}
			}
			break;
		case "image":
			if (sanitizedMediaUrl) {
				return (
					<Image
						src={sanitizedMediaUrl}
						width={200}
						height={100}
						alt={alt}
						className="object-cover"
					/>
				);
			}
			break;
		case "web":
			return (
				<div className="inline-block">
					<a href={sanitizedMediaUrl} target="_blank" rel="noopener noreferrer">
						<p className="underline text-orange/80 hover:text-orange/40">
							{alt}
						</p>
					</a>
				</div>
			);
		case "doc":
			return (
				<div className="inline-block">
					<a href={sanitizedMediaUrl} target="_blank" rel="noopener noreferrer">
						<p className="underline text-orange/80 hover:text-orange/40">
							{alt || "Open Document"}
						</p>
					</a>
				</div>
			);
		case "audio":
			return (
				<audio controls className="w-full rounded-xl border border-orange">
					<source src={sanitizedMediaUrl} type="audio/mpeg" />
					Votre navigateur ne prend pas en charge le lecteur audio.
				</audio>
			);
		default:
			return (
				<div className="inline-block border border-orange p-4 rounded-md text-center">
					<p className="text-orange/80">Type de média non pris en charge.</p>
				</div>
			); // Handling unsupported media types
	}
}
