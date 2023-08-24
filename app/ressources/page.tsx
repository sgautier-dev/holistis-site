import Image from "next/image";
import Contents from "../components/Contents";
import { getResources } from "@/sanity/lib/getResources";
import { notFound } from "next/navigation";
import resourcesBaner from "@/public/images/Website_Ressources_bandeau-330X1022.jpg";

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
					src={resourcesBaner}
					placeholder="blur"
					width={400}
					height={133}
					alt="Ressources Holistis"
					className="w-full object-cover"
					priority
				/>
			</div>

			<Contents contents={contents} />
		</main>
	);
}
