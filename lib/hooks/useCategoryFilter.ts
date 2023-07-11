import { useState, useMemo } from "react";

type CategoryItem = Overview | SameSame | Resource;

export function useCategoryFilter(
  items: CategoryItem[]
): {
  uniqueCategories: string[];
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  filteredItems: CategoryItem[];
} {
	const [selectedCategory, setSelectedCategory] = useState<string>("Toutes catégories");

	const uniqueCategories = useMemo(
		() =>
			Array.from(
				new Set(
					items.flatMap((item) =>
						item.categories.map((category) => category.title)
					)
				)
			),
		[items]
	);

	const filteredItems = useMemo(
		() =>
			selectedCategory === "Toutes catégories"
				? items
				: items.filter((item) =>
						item.categories
							.map((category) => category.title)
							.includes(selectedCategory)
				  ),
		[selectedCategory, items]
	);

	return {
		uniqueCategories,
		selectedCategory,
		setSelectedCategory,
		filteredItems,
	};
};

export default useCategoryFilter;
