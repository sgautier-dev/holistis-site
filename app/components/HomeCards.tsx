import Image from "next/image";

export default function HomeCards() {
	return (
		<div className="mx-auto max-w-7xl px-6 lg:px-8">
			<div className="mx-auto my-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-10 sm:my-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
				<article className="relative isolate flex items-center justify-center overflow-hidden rounded-2xl h-96 shadow-md shadow-blue">
					<Image
						src="/images/Website_Overview bandeau.jpg"
						width={400}
						height={133}
						alt="Overview Holistis"
						className="w-full object-cover"
					/>
					<div className="absolute inset-0 -z-10 bg-gradient-to-t from-purple via-blue/40" />
					<div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-blue/10" />
				</article>

				<article className="relative isolate flex items-center justify-center overflow-hidden rounded-2xl h-96 shadow-md shadow-blue">
					<Image
						src="/images/Website_SSBD_bandeau-3300x1018.jpg"
						width={400}
						height={133}
						alt="Same Same Holistis"
						className="w-full object-cover"
					/>
					<div className="absolute inset-0 -z-10 bg-gradient-to-t from-purple via-blue/40" />
					<div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-blue/10" />
				</article>

				<article className="relative isolate flex items-center justify-center overflow-hidden rounded-2xl h-96 shadow-md shadow-blue ">
					<Image
						src="/images/Website_Ressources_bandeau-3300x961.jpg"
						width={400}
						height={133}
						alt="Ressources Holistis"
						className="w-full object-cover"
					/>
					<div className="absolute inset-0 -z-10 bg-gradient-to-t from-purple via-blue/40" />
					<div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-blue/10" />
				</article>
			</div>
		</div>
	);
}
