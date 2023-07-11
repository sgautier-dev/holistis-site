"use client";
import ResourceMedia from "./ResourceMedia";
import ItemFilter from "./ItemFilter";
import useItemFilter from "@/lib/hooks/useItemFilter";
import { ALL_CATEGORIES_LABEL } from "@/lib/constants";

type ContentsProps = {
	contents: Resource[];
};

export default function Contents({ contents }: ContentsProps) {
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

	return (
		<div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
			<ItemFilter
				uniqueItems={uniqueCategories}
				selectedItem={selectedCategory}
				setSelectedItem={setSelectedCategory}
				allLabel={ALL_CATEGORIES_LABEL}
			/>
			<ul className="mx-auto mt-20 grid place-items-center max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
				{filteredByCategories.map((content) => (
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
