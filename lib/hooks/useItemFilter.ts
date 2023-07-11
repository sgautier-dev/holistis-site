import { useState, useMemo } from "react";

type CategoryItem = Overview | SameSame | Resource;

interface useItemFilterProps<T extends CategoryItem> {
	items: T[];
	getItemTypes: (item: T) => string[];
}

export default function useItemFilter<T extends CategoryItem>({
	items,
	getItemTypes,
	allLabel = "Tout", // default value if allLabel is not provided
}: useItemFilterProps<T> & { allLabel?: string }): {
	uniqueItems: string[];
	selectedItem: string;
	setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
	filteredItems: T[];
} {
	const [selectedItem, setSelectedItem] = useState<string>(allLabel);

	const uniqueItems = useMemo(() => {
		const allItemTypes = items.flatMap(getItemTypes);
		return Array.from(new Set(allItemTypes));
	}, [items, getItemTypes]);

	const filteredItems = useMemo(() => {
		return items.filter((item) =>
			selectedItem === allLabel
				? true
				: getItemTypes(item).includes(selectedItem)
		);
	}, [items, getItemTypes, selectedItem, allLabel]);

	return {
		uniqueItems,
		selectedItem,
		setSelectedItem,
		filteredItems,
	};
}
