import Image from "next/image";
import { getAllOverview } from "@/sanity/lib/getAllOverview";
import { urlForImage } from "@/sanity/lib/image";

// const articles = [
// 	{
// 		_id: 1,
// 		title: "Boost your conversion rate",
// 		href: "#",
// 		description:
// 			"Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
// 		imageUrl:
// 			"https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
// 		date: "Mar 16, 2020",
// 		datetime: "2020-03-16",
// 		author: {
// 			name: "Michael Foster",
// 			imageUrl:
// 				"https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
// 		},
// 	},
// 	// More articles...
// ];

export default async function Articles() {
	const articles:OverviewPreview[] = await getAllOverview();

	return (
		<div className="mx-auto max-w-7xl px-6 lg:px-8">
			<div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
				{articles.map((article) => (
					<article
						key={article._id}
						className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
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
								{article.publishedAt}
							</time>
							<div className="-ml-4 flex items-center gap-x-4">
								<svg
									viewBox="0 0 2 2"
									className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50"
								>
									<circle cx={1} cy={1} r={1} />
								</svg>
								
							</div>
						</div>
						<h3 className="mt-3 text-lg font-semibold leading-6 text-orange">
							{/* <a href={article.slug}>
								<span className="absolute inset-0" />
								{article.title}
							</a> */}
                            {article.title}
						</h3>
					</article>
				))}
			</div>
		</div>
	);
}
