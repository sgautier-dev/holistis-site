import Articles from "@/app/components/Articles";
import Image from "next/image";
import { getAllOverview } from "@/sanity/lib/getAllOverview";
import { notFound } from "next/navigation";

import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export const metadata = {
	title: "Overview",
};

export const revalidate = 10000;

export default async function Overview() {
	const query = groq`*[_type == "overview"] | order(publishedAt desc) {_id, title, slug, mainImage, publishedAt,
		categories[]-> {
		  _id,
		  title
		}}`;
	const articles: Overview[] = await client.fetch(query, { next: { tags: ['overview'] } });

	// const articles: Overview[] = await getAllOverview();

	if (!articles.length) {
		notFound();
	}

	return (
		<main className="px-6 lg:px-8 py-20 sm:py-24 mx-auto max-w-7xl min-h-screen">
			<div className="mx-auto max-w-md text-center">
				<Image
					src="/images/Website_Overview_bandeau-3300X1018.jpg"
					width={400}
					height={133}
					alt="Overview Holistis"
					className="w-full object-cover"
				/>
			</div>
			<p className="">
				{/* L'overview effect est le "choc" cognitif, la prise de conscience,
				l'effet ressenti par les astronautes la première fois qu'ils voient la
				terre depuis l'espace. Plus de la moitié d'entre eux reconnaissent avoir
				radicalement changé ensuite. <br />
				Chacun de nous a vécu un ou plusieurs « overview effect », de plus ou
				moins grande importance. C’est ce moment où notre perception change, et
				où l’après ne sera plus comme avant. */}
			</p>
			<Articles articles={articles} />
		</main>
	);
}
