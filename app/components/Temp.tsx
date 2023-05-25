import Link from "next/link";
import Image from "next/image";
import { BsLinkedin, BsArrowUpSquare } from "react-icons/bs";
import { navigation } from "@/lib/navigation";
import NewsletterForm from "./NewsletterForm";

export default function Example() {
	const today = new Date();
	const year = today.getFullYear().toString();

	return (
		<footer className="bg-blue" aria-labelledby="footer-heading">
			<h2 id="footer-heading" className="sr-only">
				Footer
			</h2>
			<div className="mx-auto max-w-7xl px-6 pb-8 pt-20 lg:px-8">
				<div className="xl:grid xl:grid-cols-4 xl:gap-8">
					<div className="grid grid-cols-2 gap-8 xl:col-span-2">
						<div className="md:grid md:grid-cols-2 md:gap-8">
							<div>
								<h3 className="text-sm font-semibold leading-6 text-white">
									Pages
								</h3>
								<ul role="list" className="mt-6 space-y-4">
									{navigation.menu.map((item) => (
										<li key={item.name}>
											<a
												href={item.href}
												className="text-sm leading-6 text-gray-300 hover:text-white"
											>
												{item.name}
											</a>
										</li>
									))}
								</ul>
							</div>
							<div className="mt-10 md:mt-0">
								<h3 className="text-sm font-semibold leading-6 text-white">
									Légal
								</h3>
								<ul role="list" className="mt-6 space-y-4">
									{navigation.legal.map((item) => (
										<li key={item.name}>
											<a
												href={item.href}
												className="text-sm leading-6 text-gray-300 hover:text-white"
											>
												{item.name}
											</a>
										</li>
									))}
								</ul>
							</div>
						</div>
						<div className="md:grid md:grid-cols-2 md:gap-8">
							<div className="aspect-[3/1] w-24">
								<Image
									className="object-fit shadow-2xl"
									src="/images/logo_europe.png"
									alt="logo europe"
									width={166}
									height={124}
								/>
							</div>
							<div className="aspect-[3/1] w-28 mt-10 md:mt-0">
								<Image
									className="object-cover shadow-2xl"
									src="/images/logo_region.webp"
									alt="logo europe"
									width={486}
									height={230}
								/>
							</div>
						</div>
					</div>
					<div className="md:grid md:grid-cols-2 xl:grid-cols-none xl:col-span-2">
						{<NewsletterForm />}
					</div>
				</div>
				<div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24">
					<div className="flex space-x-6 md:order-2 text-white">
						<Link
							href="https://www.linkedin.com/in/borisbenet"
							className="text-center hover:opacity-50"
							target="_blank"
							aria-label="compte linkedin de Boris Benet, Holistis"
						>
							<BsLinkedin size={20} />
						</Link>
						<a href="#" aria-label="back to top" className="fixed right-4 bottom-20 opacity-40 hover:opacity-70">
							<BsArrowUpSquare size={40} />
						</a>
					</div>
					<div className="flex space-x-6 mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">
						<p>
							&copy; <span>{year}</span> Holistis, Tous droits réservés.
						</p>
						<Link href="https://www.sgautier.dev/" target="_blank">
							<p translate="no">Designed by SG</p>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}