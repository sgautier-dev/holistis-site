import { getArticle } from "@/sanity/lib/getArticle";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import ResourceMedia from "@/app/components/ResourceMedia";
import React from "react";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";
import { getAllOverview } from "@/sanity/lib/getAllOverview";

type Props = {
	params: { article: string };
};

export async function generateMetadata({ params }: Props) {
	const slug = params.article;
	const article = await getArticle(slug);

	return {
		title: article?.title,
	};
}

export async function generateStaticParams() {
	const articles: Overview[] = await getAllOverview();

	return articles.map((article) => ({
		slug: article.slug,
	}));
}

export default async function Article({ params }: Props) {
	const slug = params.article;
	const article = await getArticle(slug);

	if (!article) {
		notFound();
	}

	return (
		<main className="px-6 lg:px-8 py-20 sm:py-24 mx-auto max-w-7xl min-h-screen bg-white">
			<Link
				href="/overview"
				className="inline-flex items-center justify-center rounded-md p-2 text-orange hover:bg-orange hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
			>
				<ChevronDoubleLeftIcon className="block h-14 w-14" aria-hidden="true" />
			</Link>

			<div className="mx-auto max-w-2xl text-base leading-7 text-blue grid grid-cols-1 place-items-center">
				<div className="mx-auto w-full text-center">
					<Image
						src={urlForImage(article.bannerImage).url()}
						width={800}
						height={300}
						alt={article.bannerImage.alt}
						className="w-full object-cover"
					/>
				</div>
				<h1 className="mt-8 text-3xl uppercase font-semibold tracking-tight text-orange sm:text-4xl">
					{article.title}
				</h1>
				<figure className="mt-8">
					<Image
						className="aspect-video rounded-xl bg-gray-50 object-cover border-4 border-orange"
						src={urlForImage(article.mainImage).url()}
						width={600}
						height={600}
						alt={article.mainImage.alt}
					/>
				</figure>

				<div className="mt-6 leading-8">
					<PortableText value={article.editoText} />
				</div>

				{article.sections?.map((section, index) => (
					<React.Fragment key={index}>
						<div className="mt-8 w-full border-t-4 border-orange" />

						<figure className="mt-8 max-w-sm grid grid-cols-1 place-items-center">
							<Image
								className="bg-gray-50 object-cover"
								src={urlForImage(section.proposition180.pictoImage).url()}
								width={100}
								height={100}
								alt={article.mainImage.alt}
							/>
							<h2 className="mt-8 text-orange uppercase text-2xl font-semibold text-center">
								{section.proposition180.question.questionText}
							</h2>
						</figure>

						{section.subsections.map((subsection, index) => (
							<React.Fragment key={index}>
								<div className="mt-8 w-full border-t-4 border-orange" />
								<h2 className="mt-6 uppercase font-semibold text-xl text-center text-orange">
									{subsection.title}
								</h2>
								<ul className=" w-full">
									{subsection.contents.map((content) => (
										<li
											key={content._id}
											className="mt-8 border-t border-dotted border-orange first:border-none"
										>
											<h3 className="mt-6 uppercase font-bold ">
												{content.title}
											</h3>
											<div className="flex items-end gap-x-2">
												<Image
													className="mt-2 bg-gray-50 object-cover"
													src={urlForImage(content.picto.image).url()}
													width={50}
													height={50}
													alt={content.picto.alt}
												/>
												<p className="font-semibold">{content.duration}</p>
											</div>
											<PortableText value={content.body} />
											<div className="mt-4">
												<ResourceMedia
													mediaType={content.mediaType}
													media={content.media}
													alt={content.alt}
												/>
											</div>
										</li>
									))}
								</ul>
							</React.Fragment>
						))}
					</React.Fragment>
				))}

				<div className="mt-8 w-full border-t-4 border-orange" />

				<figure className="mt-8 max-w-lg grid grid-cols-1 place-items-center">
					<Image
						className="bg-gray-50 object-cover"
						src={urlForImage(article.questions.image).url()}
						width={120}
						height={100}
						alt={article.questions.image.alt}
					/>
					<p className="mt-2 font-semibold">- ET VOUS -</p>
					{article.questions.questions.map((question) => (
						<h3 className="font-semibold text-center" key={question._id}>
							{question.questionText}
						</h3>
					))}
				</figure>

				<div className="mt-8 w-full border-t-4 border-orange" />
			</div>
		</main>
	);
}
