import { getArticle } from "@/sanity/lib/getArticle";
import { notFound } from "next/navigation";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import ResourceMedia from "@/app/components/ResourceMedia";

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

export default async function Article({ params }: Props) {
	const slug = params.article;
	const article = await getArticle(slug);

	if (!article) {
		notFound();
	}

	return (
		<main className="px-6 lg:px-8 py-20 sm:py-24 mx-auto max-w-7xl min-h-screen">
			<div className="mx-auto max-w-2xl text-base leading-7 text-white grid grid-cols-1 place-items-center">
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
					{article?.title}
				</h1>
				<figure className="mt-8">
					<Image
						className="aspect-video rounded-xl bg-gray-50 object-cover border-2 border-orange"
						src={urlForImage(article.mainImage).url()}
						width={600}
						height={600}
						alt={article.mainImage.alt}
					/>
				</figure>

				<div className="mt-6 leading-8">
					<PortableText value={article.editoText} />
				</div>

				<div className="mt-8 w-full border-t-2 border-orange" />

				<figure className="mt-8 max-w-sm grid grid-cols-1 place-items-center">
					<Image
						className="bg-gray-50 object-cover"
						src={urlForImage(article.proposition180.pictoImage).url()}
						width={100}
						height={100}
						alt={article.mainImage.alt}
					/>
					<h2 className="mt-8 text-orange uppercase text-xl font-semibold text-center">
						{article.proposition180.question.questionText}
					</h2>
				</figure>

				<div className="mt-8 w-full border-t-2 border-orange" />

				<ul className=" w-full">
					{article.contents.map((content) => (
						<li
							key={content._id}
							className="mt-8 border-t border-dotted border-orange first:border-none"
						>
							<h2 className="mt-6 uppercase font-semibold">{content.title}</h2>
							<div className="flex items-end gap-x-2">
								<Image
									className="mt-2 bg-gray-50 object-cover"
									src={urlForImage(content.picto).url()}
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

							{/* Render other fields of the content */}
						</li>
					))}
				</ul>

				<div className="mt-8 w-full border-t-2 border-orange" />

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

				<div className="mt-8 w-full border-t-2 border-orange" />

				{/* <div className="mt-16 max-w-2xl">
					<h2 className="text-2xl font-bold tracking-tight">
						Everything you need to get up and running
					</h2>
					<p className="mt-6">
						Purus morbi dignissim senectus mattis adipiscing. Amet, massa quam
						varius orci dapibus volutpat cras. In amet eu ridiculus leo sodales
						cursus tristique. Tincidunt sed tempus ut viverra ridiculus non
						molestie. Gravida quis fringilla amet eget dui tempor dignissim.
						Facilisis auctor venenatis varius nunc, congue erat ac. Cras
						fermentum convallis quam.
					</p>
					<p className="mt-8">
						Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
						enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
						praesent donec est. Odio penatibus risus viverra tellus varius sit
						neque erat velit.
					</p>
				</div> */}
			</div>
		</main>
	);
}
