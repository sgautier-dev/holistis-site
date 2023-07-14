import Articles from "@/app/components/Articles";
import Image from "next/image";
import { getAllOverview } from "@/sanity/lib/getAllOverview";
import { notFound } from "next/navigation";
import QuestionButton from "../components/QuestionButton";

export const metadata = {
	title: "Overview",
};

export const revalidate = 60; //to get freshest data from sanity

export default async function Overview() {
	const articles: Overview[] = await getAllOverview();

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
					priority
				/>
			</div>
			<figure id="targetElement" className="border-l border-orange pl-8 mt-8">
				<blockquote className="sm:text-lg font-semibold text-white">
					<p>
						L&apos;overview effect est le &apos;choc&apos; cognitif, la prise de
						conscience, l&apos;effet ressenti par les astronautes la première
						fois qu&apos;ils voient la terre depuis l&apos;espace. Plus de la
						moitié d&apos;entre eux reconnaissent avoir radicalement changé
						ensuite. Chacun de nous a vécu un ou plusieurs « overview effect »,
						de plus ou moins grande importance. C’est ce moment où notre
						perception change, et où l’après ne sera plus comme avant.
					</p>
				</blockquote>
			</figure>
			<QuestionButton />
			<Articles articles={articles} />
		</main>
	);
}
