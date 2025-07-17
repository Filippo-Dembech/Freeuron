import React, {ReactNode, useEffect, useState} from 'react';
import SelectInput from 'ink-select-input';

interface SelectProps<T> {
	items: T[];
	renderItem: (
		item: T | undefined,
		isSelected: boolean | undefined,
	) => ReactNode; // TODO: try to manage better the 'undefined'
	isFocused?: boolean;
	labelFrom: (item: T) => string;
	keyFrom?: (item: T) => string;
	initialItem?: (item: T) => boolean;
	onHighlight?: (item: T) => void;
	onSelect?: (item: T) => void;
}

function findIndex<T>(items: T[], predicate: (item: T) => boolean) {
	const foundIndex = items.findIndex(predicate);
	if (foundIndex === -1) return 0;
	return foundIndex;
}

export default function Select<T>({
	items,
	isFocused = true,
	labelFrom,
	initialItem,
	renderItem,
	keyFrom,
	onHighlight,
	onSelect,
}: SelectProps<T>) {
	const hasItems = items.length > 0;
	const initialIndex = initialItem ? findIndex(items, initialItem) : 0;
	const item = hasItems ? items[initialIndex] : undefined;
	const [currentItem, setCurrentItem] = useState<T | undefined>(item);

	const formattedItems = items.map((item, i) => ({
		key: keyFrom ? keyFrom(item) : `${i}`,
		label: labelFrom(item),
		value: item,
	}));

	function getItemBy(label: string) {
		return formattedItems.find(item => item.label === label)?.value;
	}

	useEffect(() => {
		if (currentItem) onHighlight?.(currentItem);
	}, [currentItem]);

	return (
		<SelectInput
			items={formattedItems}
			isFocused={isFocused}
			initialIndex={initialIndex}
			itemComponent={({label, isSelected}) =>
				renderItem(getItemBy(label), isSelected)
			}
			onHighlight={item => setCurrentItem(item.value)}
			onSelect={item => onSelect?.(item.value)}
		/>
	);
}