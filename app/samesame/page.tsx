import Image from "next/image";
import Cards from "../components/Cards";
import { getSameSame } from "@/sanity/lib/getSameSame";
import { notFound } from "next/navigation";
import samsameBanner from "@/public/images/Website_SSBD_bandeau-3300X1020.jpg";

export const metadata = {
	title: "Same Same",
};

export default async function SameSame() {
	const cards: SameSame[] = await getSameSame();

	if (!cards.length) {
		notFound();
	}

	return (
		<main className="px-6 lg:px-8 py-20 sm:py-24 mx-auto max-w-7xl min-h-screen">
			<div className="mx-auto max-w-md text-center">
				<Image
					src={samsameBanner}
					placeholder="blur"
					width={400}
					height={133}
					alt="SameSame Holistis"
					className="w-full object-cover"
					priority
				/>
			</div>

			<Cards cards={cards} />
		</main>
	);
}
