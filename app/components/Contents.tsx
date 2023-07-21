"use client";
import ResourceMedia from "./ResourceMedia";
import ItemFilter from "./ItemFilter";
import useItemFilter from "@/lib/hooks/useItemFilter";
import { ALL_CATEGORIES_LABEL, ALL_MEDIA_LABEL } from "@/lib/constants";

type ContentsProps = {
	contents: Resource[];
};

export default function Contents({ contents }: ContentsProps) {
	const mediaTypeTitles = {
		web: "Web",
		video: "Vidéos",
		image: "Visuels",
		doc: "Docs",
		audio: "Audios",
		// Add more as needed...
	};

	const {
		selectedItem: selectedCategory,
		setSelectedItem: setSelectedCategory,
		uniqueItems: uniqueCategories,
		filteredItems: filteredByCategories,
	} = useItemFilter<Resource>({
		items: contents,
		getItemTypes: (content) =>
			content.categories.map((category) => category.title),
		allLabel: ALL_CATEGORIES_LABEL,
	});

	const {
		selectedItem: selectedMediaType,
		setSelectedItem: setSelectedMediaType,
		uniqueItems: uniqueMediaTypes,
		filteredItems: filteredByMediaTypes,
	} = useItemFilter<Resource>({
		items: contents,
		getItemTypes: (content) => [
			mediaTypeTitles[content.mediaType] || content.mediaType,
		],
		allLabel: ALL_MEDIA_LABEL,
	});

	// Get intersection of filtered arrays
	const finalFilteredItems = filteredByCategories.filter((item) =>
		filteredByMediaTypes.includes(item)
	);

	return (
		<div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
			<div className="flex gap-8">
				<ItemFilter
					uniqueItems={uniqueCategories}
					selectedItem={selectedCategory}
					setSelectedItem={setSelectedCategory}
					allLabel={ALL_CATEGORIES_LABEL}
				/>
				<ItemFilter
					uniqueItems={uniqueMediaTypes}
					selectedItem={selectedMediaType}
					setSelectedItem={setSelectedMediaType}
					allLabel={ALL_MEDIA_LABEL}
				/>
			</div>
			<ul className="mx-auto mt-20 grid place-items-center max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
				{finalFilteredItems.map((content) => (
					<li key={content._id}>
						<h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-white">
							{content.title}
						</h3>
						<p className="text-base leading-7 text-white/80">
							{content.duration}
						</p>
						<ResourceMedia
							mediaType={content.mediaType}
							media={content.media}
							alt={content.alt}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
