"use client";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { formatDate } from "@/sanity/lib/utils";
import Link from "next/link";
import ItemFilter from "./ItemFilter";
import useItemFilter from "@/lib/hooks/useItemFilter";
import { ALL_CATEGORIES_LABEL } from "@/lib/constants";

type ArticlesProps = {
	articles: Overview[];
};

export default function Articles({ articles }: ArticlesProps) {
	const {
		selectedItem: selectedCategory,
		setSelectedItem: setSelectedCategory,
		uniqueItems: uniqueCategories,
		filteredItems: filteredByCategories,
	} = useItemFilter<Overview>({
		items: articles,
		getItemTypes: (article) =>
			article.categories.map((category) => category.title),
		allLabel: ALL_CATEGORIES_LABEL,
	});

	return (
		<div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
			<div className="mx-auto max-w-2xl lg:max-w-none">
				<ItemFilter
					uniqueItems={uniqueCategories}
					selectedItem={selectedCategory}
					setSelectedItem={setSelectedCategory}
					allLabel={ALL_CATEGORIES_LABEL}
				/>
				<div className="mx-auto grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 mt-10 sm:mt-12 lg:mx-0 lg:max-w-none lg:grid-cols-3 mb-16 sm:mb-20">
					{filteredByCategories.map((article) => (
						<article
							key={article._id}
							className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 hover:scale-105 transition "
						>
							<Image
								src={urlForImage(article.mainImage).url()}
								alt={article.mainImage.alt}
								width={400}
								height={200}
								className="absolute inset-0 -z-10 h-full w-full object-cover"
							/>
							<div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
							<div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

							<div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
								<time dateTime={article.publishedAt} className="mr-8">
									{formatDate(article.publishedAt)}
								</time>
								{/* <div className="-ml-4 flex items-center gap-x-4">
								<svg
									viewBox="0 0 2 2"
									className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50"
								>
									<circle cx={1} cy={1} r={1} />
								</svg>
								
							</div> */}
							</div>
							<h3 className="mt-3 text-lg font-semibold leading-6 text-orange">
								<Link href={`/overview/${article.slug.current}`}>
									<span className="absolute inset-0 " />
									{article.title}
								</Link>
							</h3>
						</article>
					))}
				</div>
			</div>
		</div>
	);
}
