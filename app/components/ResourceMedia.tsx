import { getEmbeddedYouTubeUrl } from "@/lib/getEmbeddedYouTubeUrl";
import Image from "next/image";

type ResourceMediaProps = {
	mediaType: Resource["mediaType"];
	media: Resource["media"];
	alt: Resource["alt"];
};

export default function ResourceMedia({
	mediaType,
	media,
	alt,
}: ResourceMediaProps) {

	if (mediaType === "video") {
		// Construct the embedded YouTube URL
		const embeddedUrl = getEmbeddedYouTubeUrl(media);

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
				<video controls className="w-full aspect-video rounded-xl border border-orange">
					<source src={media} />
					Votre navigateur ne prend pas en charge le lecteur vidéo.
				</video>
			);
		}
	} else if (mediaType === "image") {
		return (
			<Image
				src={media}
				width={800}
				height={300}
				alt={alt}
				className="w-full object-cover"
			/>
		);
	} else if (mediaType === "web") {
		return (
			<div className="inline-block">
				<a href={media} target="_blank" rel="noopener noreferrer">
					<p className="underline text-orange/80 hover:text-orange/40">{alt}</p>
				</a>
			</div>
		);
	} else {
		return null; // Handle unsupported media types or show a placeholder
	}
}
