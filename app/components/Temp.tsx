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
			<div className="mx-auto max-w-7xl px-6 pb-8 pt-20 sm:pt-24 lg:px-8 lg:pt-32">
				<div className="xl:grid xl:grid-cols-3 xl:gap-8">
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
					<div className="xl:col-span-1">{<NewsletterForm />}</div>

					{/* <div className="mt-10 xl:mt-0">
						<h3 className="text-sm font-semibold leading-6 text-white">
							Subscribe to our newsletter
						</h3>
						<p className="mt-2 text-sm leading-6 text-gray-300">
							The latest news, articles, and resources, sent to your inbox
							weekly.
						</p>
						<form className="mt-6 sm:flex sm:max-w-md">
							<label htmlFor="email-address" className="sr-only">
								Email address
							</label>
							<input
								type="email"
								name="email-address"
								id="email-address"
								autoComplete="email"
								required
								className="w-full min-w-0 appearance-none rounded-md border-0 bg-white/5 px-3 py-1.5 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:w-64 sm:text-sm sm:leading-6 xl:w-full"
								placeholder="Enter your email"
							/>
							<div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
								<button
									type="submit"
									className="flex w-full items-center justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
								>
									Subscribe
								</button>
							</div>
						</form>
					</div> */}
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
						<a href="#" aria-label="back to top">
							<BsArrowUpSquare size={20} />
						</a>
					</div>
					<div className="flex space-x-6 mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">
						<p>
							&copy; <span>{year}</span> Holitis, Inc. Tous droits réservés.
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
