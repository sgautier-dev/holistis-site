"use client";
import { Disclosure, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
	{ name: "Accueil", href: "/", current: true },
	{ name: "Contact", href: "/contact", current: false },
];

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function HamburgerMenu() {
	return (
		<Disclosure as="nav" className="">
			{({ open }) => (
				<>
					<div className="absolute inset-y-0 right-0 flex items-center">
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

					<Disclosure.Panel className="">
						<div className="space-y-1 px-2 pb-3 pt-2">
							{navigation.map((item) => (
								<Disclosure.Button
									key={item.name}
									as="a"
									href={item.href}
									className={classNames(
										item.current
											? "bg-gray-900 text-white"
											: "text-gray-300 hover:bg-gray-700 hover:text-white",
										"block rounded-md px-3 py-2 text-base font-medium"
									)}
									aria-current={item.current ? "page" : undefined}
								>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
