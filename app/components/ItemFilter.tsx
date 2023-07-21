import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

type ItemFilterProps = {
	uniqueItems: string[];
	selectedItem: string;
	setSelectedItem: (value: string) => void;
	allLabel: string;
};

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function ItemFilter({
	uniqueItems,
	selectedItem,
	setSelectedItem,
	allLabel,
}: ItemFilterProps) {
	return (
		<Menu as="div" className="relative inline-block text-left">
			<div className="border-b">
				<Menu.Button className="group inline-flex justify-center text-lg font-medium text-white hover:text-gray-500 capitalize">
					{selectedItem}
					<ChevronDownIcon
						className="-mr-1 ml-1 h-7 w-7 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
						aria-hidden="true"
					/>
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="py-1">
						<Menu.Item key={allLabel}>
							{({ active }) => (
								<button
									onClick={() => setSelectedItem(allLabel)}
									className={classNames(
										active ? "bg-gray-100" : "",
										"w-full text-left block px-4 py-2 text-sm font-medium text-gray-900 capitalize"
									)}
								>
									{allLabel}
								</button>
							)}
						</Menu.Item>

						{uniqueItems.map((item) => (
							<Menu.Item key={item}>
								{({ active }) => (
									<button
										onClick={() => {
											setSelectedItem(item);
											// // Find the target element and scroll to it
											// const targetElement =
											// 	document.getElementById("targetElement");
											// targetElement?.scrollIntoView({
											// 	behavior: "smooth",
											// 	block: "start",
											// });
										}}
										className={classNames(
											active ? "bg-gray-100" : "",
											"w-full text-left block px-4 py-2 text-sm font-medium text-gray-900 capitalize"
										)}
									>
										{item}
									</button>
								)}
							</Menu.Item>
						))}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
