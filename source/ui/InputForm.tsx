import React from 'react';
import {Box, Text} from 'ink';
import {Category} from '../types.js';
import NoCategoryFoundError from '../ui/NoCategoryFoundError.js';
import {Focus} from '../Focus.js';
import Focusable from '../components/Focusable.js';
import {useThought} from '../context/ThoughtContext.js';
import CategoryInput from './CategoryInput.js';
import ThoughtInput from './ThoughtInput.js';

export type Option = {
	label: string;
	value: Category;
};

interface InputFormProps {
	onSubmit: (category: Category, content: string) => void;
}

export default function InputForm({onSubmit}: InputFormProps) {
	const {category, content, error} = useThought();

	if (!category) return <NoCategoryFoundError />;

	return (
		<>
			<Box>
				<Focusable
					id={Focus.categorySelect}
					nextFocus={[
						{
							to: Focus.textField,
							when: (_, key) => key.return,
						},
					]}
					renderComponent={({isFocused}) => (
						<CategoryInput isFocused={isFocused} />
					)}
				/>
				<Focusable
					id={Focus.textField}
					renderComponent={({isFocused}) => (
						<ThoughtInput
							isFocused={isFocused}
							onSubmit={() => onSubmit(category, content)}
						/>
					)}
				/>
			</Box>
			<Text color="red" bold>
				{error}
			</Text>
		</>
	);
}
