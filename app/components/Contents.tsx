import Image from "next/image";
import ResourceMedia from "./ResourceMedia";

type ContentsProps = {
	contents: Resource[];
};

export default function Contents({ contents }: ContentsProps) {
	return (
		<div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
			<ul className="mx-auto mt-20 grid place-items-center max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
				{contents.map((content) => (
					<li key={content._id}>
						<ResourceMedia
							mediaType={content.mediaType}
							media={content.media}
							alt={content.alt}
						/>
						<h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-white">
							{content.title}
						</h3>
						<p className="text-base leading-7 text-white/80">
							{content.duration}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
}
