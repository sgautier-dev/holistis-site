import Articles from "@/app/components/Articles";
import Image from "next/image";

export default function Overview() {
	return (
		<main className="px-6 lg:px-8 mx-auto max-w-7xl min-h-screen">
			<div className="mx-auto max-w-md text-center my-16 sm:my-20">
				<Image
					src="/images/Website_Overview_bandeau-3300X1018.jpg"
					width={400}
					height={133}
					alt="Overview Holistis"
					className="w-full object-cover"
				/>
			</div>
			<Articles />
		</main>
	);
}
