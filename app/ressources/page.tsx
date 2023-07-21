import Image from "next/image";
import Contents from "../components/Contents";
import { getResources } from "@/sanity/lib/getResources";
import { notFound } from "next/navigation";

export const metadata = {
	title: "Ressources",
};

export default async function Resources() {
	const contents: Resource[] = await getResources();

	if (!contents.length) {
		notFound();
	}

	return (
		<main className="px-6 lg:px-8 py-20 sm:py-24 mx-auto max-w-7xl min-h-screen">
			<div className="mx-auto max-w-md text-center">
				<Image
					src="/images/Website_Ressources_bandeau-330X1022.jpg"
					width={400}
					height={133}
					alt="Ressources Holistis"
					className="w-full object-cover"
					priority
				/>
			</div>
			{/* <figure className="border-l border-orange pl-8 mt-8">
				<blockquote className="text-lg font-semibold text-white">
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
			</figure> */}

			<Contents contents={contents} />
		</main>
	);
}
