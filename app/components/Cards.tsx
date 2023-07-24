"use client";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { formatDate } from "@/sanity/lib/utils";
import { PortableText } from "@portabletext/react";
import useItemFilter from "@/lib/hooks/useItemFilter";
import ItemFilter from "./ItemFilter";
import { ALL_CATEGORIES_LABEL } from "@/lib/constants";

type SameSameProps = {
	cards: SameSame[];
};

export default function Cards({ cards }: SameSameProps) {
	const {
		selectedItem: selectedCategory,
		setSelectedItem: setSelectedCategory,
		uniqueItems: uniqueCategories,
		filteredItems: filteredByCategories,
	} = useItemFilter<SameSame>({
		items: cards,
		getItemTypes: (card) => card.categories.map((category) => category.title),
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
			<div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none sm:grid-cols-2 xl:grid-cols-3">
				{filteredByCategories.map((card) => (
					<article
						key={card._id}
						className="flex flex-col items-start justify-between"
					>
						<div className="group relative">
							<div className="relative w-full group-hover:scale-[1.2] transition-transform duration-500 ease-in-out">
								<Image
									src={urlForImage(card.image).url()}
									alt={card.image.alt}
									width={2200}
									height={1100}
									className="rounded-2xl h-full w-full object-contain "
								/>
								<div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-orange/60" />
							</div>
							<div className="max-w-xl">
								{/* <div className="mt-8 flex items-center gap-x-4 text-xs text-white">
									<time dateTime={card.publishedAt} className="mr-8">
										{formatDate(card.publishedAt)}
									</time>
								</div> */}

								{/* <h3 className="mt-3 text-lg font-semibold leading-6 text-orange group-hover:scale-105 transition-transform duration-500 ease-in-out">
									{card.title}
								</h3> */}
								<div className="mt-5 text-lg leading-6 text-white">
									<PortableText value={card.text} />
								</div>
							</div>
						</div>
					</article>
				))}
			</div>
		</div>
	);
}
