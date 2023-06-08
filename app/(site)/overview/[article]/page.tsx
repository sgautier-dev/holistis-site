import { getArticle } from "@/sanity/lib/getArticle";
import { notFound } from "next/navigation";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";

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
	console.log(article.proposition180.question.questionText);

	return (
		<main className="px-6 lg:px-8 mx-auto max-w-7xl min-h-screen">
			<div className="mx-auto max-w-3xl text-base leading-7 text-white">
				<div className="mx-auto text-center my-16 sm:my-20">
					<Image
						src={urlForImage(article.bannerImage).url()}
						width={800}
						height={300}
						alt={article.bannerImage.alt}
						className="w-full object-cover"
					/>
				</div>
				<h1 className="mt-2 text-3xl font-bold tracking-tight text-orange sm:text-4xl">
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

				<div className="mt-6 leading-7">
					<PortableText value={article.editoText} />
				</div>

				<figure className="mt-8 grid grid-cols-1 place-items-center">
					<Image
						className="bg-gray-50 object-cover"
						src={urlForImage(article.proposition180.pictoImage).url()}
						width={100}
						height={100}
						alt={article.mainImage.alt}
					/>
					<p className="mt-6 text-orange text-xl">{article.proposition180.question.questionText}</p>
				</figure>

				<div className="mt-16 max-w-2xl">
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
				</div>
			</div>
		</main>
	);
}
