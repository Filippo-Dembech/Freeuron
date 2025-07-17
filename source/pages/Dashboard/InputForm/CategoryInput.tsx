import React from "react";
import Container from "../../../components/Container.js";
import SelectInput from "ink-select-input";
import { useThought } from "../../../context/ThoughtContext.js";
import { Category } from "../../../types.js";

type CategoryInputProps = {
    isFocused?: boolean
}

export type Option = {
	label: string;
	value: Category;
};

export default function CategoryInput({ isFocused = false}: CategoryInputProps) {
    
    const { categories, setCategory } = useThought();

	const options: Option[] | undefined = categories.map(category => ({
		key: `${category.name}-${category.placeholder}`, // without key error is thrown for <SelectInput/> uses 'value' as key - in this case 'value' is an object so it sees all keys are the same.
		label: category.name,
		value: category,
	}));

	return (
		<Container isFocused={isFocused} padding={1}>
			<SelectInput
				items={options}
				initialIndex={0}
				onHighlight={item => setCategory(item.value)}
				isFocused={isFocused}
			/>
		</Container>
	);
}
