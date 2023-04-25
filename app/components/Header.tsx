"use client";
import Link from "next/link";
import Image from "next/image";

import { Fragment } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
	{ name: "Accueil", href: "/", current: true },
	{ name: "Contact", href: "/contact", current: false },
];

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function Header() {
	return (
		<Disclosure as="nav" className="">
			{({ open }) => (
				<>
					<header className=" bg-blue p-6 sticky top-0 drop-shadow-xl z-10">
						<div className="mx-auto relative flex items-center justify-between gap-1 flex-col sm:flex-row">
							<Link
								href="/"
								className="hover:opacity-80 focus-visible:outline-orange"
							>
								<Image
									className="border-2 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full "
									src="/images/boris-profil-787x787.jpg"
									width={70}
									height={70}
									alt="boris benet photo de profile"
									priority={true}
								/>
							</Link>
							<Link
								href="/"
								className="hover:opacity-80 focus-visible:outline-orange"
							>
								<Image
									src="/images/LogoHolistis-Blanc.gif"
									width={250}
									height={100}
									alt="logo holistis"
									priority={true}
								/>
							</Link>

							{/* Mobile menu button*/}
							<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-orange hover:bg-orange hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
								<span className="sr-only">Open main menu</span>
								{open ? (
									<XMarkIcon className="block h-14 w-14" aria-hidden="true" />
								) : (
									<Bars3Icon className="block h-14 w-14" aria-hidden="true" />
								)}
							</Disclosure.Button>
						</div>
					</header>

					<Transition
						as={Fragment}
						enter="transition ease-in-out duration-300 transform"
						enterFrom="-translate-y-full opacity-0 scale-95"
						enterTo="translate-y-0 opacity-100 scale-100"
						leave="transition ease-in-out duration-200 transform"
						leaveFrom="translate-y-0 opacity-100 scale-100"
						leaveTo="-translate-y-full opacity-0 scale-95"
					>
						<Disclosure.Panel className="bg-blue text-center absolute w-full">
							<div className="space-y-1 px-2 pb-3 pt-2">
								{navigation.map((item) => (
									<Disclosure.Button
										key={item.name}
										as="a"
										href={item.href}
										className={classNames(
											item.current
												? "bg-orange text-white"
												: "text-gray-300 hover:bg-orange/20 hover:text-white",
											"block rounded-md px-3 py-2 text-lg font-medium"
										)}
										aria-current={item.current ? "page" : undefined}
									>
										{item.name}
									</Disclosure.Button>
								))}
							</div>
						</Disclosure.Panel>
					</Transition>
				</>
			)}
		</Disclosure>
	);
}
