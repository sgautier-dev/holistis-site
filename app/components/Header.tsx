"use client";
import Link from "next/link";
import Image from "next/image";
import { navigation } from "@/lib/navigation";
import { usePathname } from "next/navigation";

import { Fragment } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import {
	Bars3Icon,
	XMarkIcon,
	BellAlertIcon,
} from "@heroicons/react/24/outline";
import QuestionButton from "./QuestionButton";
import borisProfil from "@/public/images/boris-profil-787x787.jpg"

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function Header() {
	const pathname = usePathname();

	return (
		<Disclosure as="nav" className="sm:sticky sm:top-0 z-40">
			{({ open }) => (
				<>
					<header className="bg-blue p-6 drop-shadow-xl relative">
						<div className="mx-auto relative flex items-center justify-between gap-2 flex-col sm:flex-row">
							<Link
								href="/"
								className="hover:opacity-80 focus-visible:outline-orange"
							>
								<Image
									className="border-2 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full w-16 h-16 sm:w-[70px] sm:h-[70px]"
									src={borisProfil}
									width={70}
									height={70}
									placeholder="blur"
									alt="boris benet photo de profile"
									priority={true}
								/>
							</Link>
							<Link
								href="/"
								className="hover:opacity-80 focus-visible:outline-orange"
							>
								<Image
									className="w-48 h-auto sm:w-52 md:w-60"
									src="/images/LogoHolistis-Blanc.gif"
									width={250}
									height={100}
									alt="logo holistis"
									priority={true}
								/>
							</Link>

							{/* Menu button*/}
							<div className="flex flex-col items-center gap-8 sm:flex-row">
								<div className="absolute top-0 right-0 sm:static sm:flex sm:items-center sm:gap-8 order-2 sm:-order-none ">
									<QuestionButton />
									<a
										href="#newsletter"
										className="hover:scale-110"
										aria-label="vers la newsletter"
									>
										<BellAlertIcon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-orange mt-6 sm:mt-0" />
									</a>
								</div>

								<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-orange hover:bg-orange hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XMarkIcon className="block h-12 w-12 md:h-14 md:w-14" aria-hidden="true" />
									) : (
										<Bars3Icon className="block h-12 w-12 md:h-14 md:w-14" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
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
						<Disclosure.Panel className="bg-blue text-center absolute w-full z-40">
							<div className="space-y-1 px-2 pb-3 pt-2">
								{navigation.menu.map((item) => (
									<Disclosure.Button
										key={item.name}
										as="a"
										href={item.href}
										className={classNames(
											pathname === item.href
												? "bg-orange text-white"
												: "text-gray-300 hover:bg-orange/20 hover:text-white",
											"block rounded-md px-3 py-2 text-2xl font-medium "
										)}
										aria-current={pathname === item.href ? "page" : undefined}
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
