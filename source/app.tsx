import React, {useState} from 'react';
import {Box, Text, useInput} from 'ink';
import SelectInput from 'ink-select-input';
import TextInput from 'ink-text-input';

type Category = 'todo' | 'question' | 'insight';
type Option = {
	label: string;
	value: Category;
};

type Item = {
	category: Category;
	content: string;
};

export default function App() {
	const [category, setCategory] = useState<Category>('todo');
	const [content, setContent] = useState<string>('');
	const [items, setItems] = useState<Item[]>([]);
	const [focus, setFocus] = useState<'category' | 'content'>('content');
	const [error, setError] = useState("");

	const handleSelect = (option: Option) => {
		setCategory(option.value);
		switchFocus();
	}
	const syncContent = (value: string) => {
		setError("");
		setContent(value);
	}
	const createNewItem = () => {
		if (!content) return setError("Content can't be empty.")
		setItems(curr => [...curr, {category, content}]);
		setContent("");
	}
	const switchFocus = () =>
		setFocus(curr => (curr === 'category' ? 'content' : 'category'));
		
	useInput((_, key) => {
		if (key.tab) {
			switchFocus();
		}
	})

	const options: Option[] = [
		{
			label: 'Todo',
			value: 'todo',
		},
		{
			label: 'Question',
			value: 'question',
		},
		{
			label: 'Insight',
			value: 'insight',
		},
	];

	const getPlaceholder: () => string = () => {
		if (category === 'insight') return 'Enter your insight...';
		if (category === 'todo') return 'Enter what you have to do...';
		return 'Enter your question...';
	};

	return (
		<Box flexDirection="column">
			<Box>
				<Box borderStyle="round">
					<SelectInput
						items={options}
						initialIndex={0}
						onSelect={handleSelect}
						isFocused={focus == 'category'}
					/>
				</Box>
				<Box borderStyle="round" flexGrow={1}>
					<TextInput
						placeholder={getPlaceholder()}
						value={content}
						onChange={syncContent}
						onSubmit={createNewItem}
						focus={focus === 'content'}
					/>
				</Box>
			</Box>
			<Text color="red" bold>{error}</Text>
			<Box borderStyle="bold" borderColor="gray" flexDirection="column">
				{items.map((item, i) => (
					<Text key={`${item.content}-${i}`}>
						{item.category} - {item.content}
					</Text>
				))}
			</Box>
		</Box>
	);
}
