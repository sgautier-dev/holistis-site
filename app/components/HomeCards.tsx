import Image from "next/image";
import Link from "next/link";

export default function HomeCards() {
	return (
		<div className="mx-auto grid max-w-2xl auto-rows-fr grid-cols-1 gap-10 lg:mx-0 lg:max-w-none lg:grid-cols-3 px-6 lg:px-0">
			<article className="relative isolate flex items-center justify-center overflow-hidden rounded-2xl h-96 shadow-md shadow-orange hover:scale-105 transition">
				<Image
					src="/images/Website_Overview_bandeau-3300X1018.jpg"
					width={400}
					height={133}
					alt="Overview Holistis"
					className="w-full object-cover"
				/>
				<div className="absolute inset-0 -z-10 bg-gradient-to-t from-purple via-blue/40" />
				<div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-blue/10" />
				<Link href={`/overview`} aria-label="vers overview">
					<span className="absolute inset-0 " />
				</Link>
			</article>

			<article className="relative isolate flex items-center justify-center overflow-hidden rounded-2xl h-96 shadow-md shadow-orange hover:scale-105 transition">
				<Image
					src="/images/Website_SSBD_bandeau-3300X1020.jpg"
					width={400}
					height={133}
					alt="Same Same Holistis"
					className="w-full object-cover"
				/>
				<div className="absolute inset-0 -z-10 bg-gradient-to-t from-purple via-blue/40" />
				<div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-blue/10" />
				<Link href={`/samesame`} aria-label="vers same same">
					<span className="absolute inset-0 " />
				</Link>
			</article>

			<article className="relative isolate flex items-center justify-center overflow-hidden rounded-2xl h-96 shadow-md shadow-orange hover:scale-105 transition">
				<Image
					src="/images/Website_Ressources_bandeau-330X1022.jpg"
					width={400}
					height={133}
					alt="Ressources Holistis"
					className="w-full object-cover"
				/>
				<div className="absolute inset-0 -z-10 bg-gradient-to-t from-purple via-blue/40" />
				<div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-blue/10" />
				<Link href={`/ressources`} aria-label="vers ressources">
					<span className="absolute inset-0 " />
				</Link>
			</article>
		</div>
	);
}
