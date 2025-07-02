import React, {useReducer} from 'react';
import {Box, Text, useInput} from 'ink';
import SelectInput from 'ink-select-input';
import {Category, Option} from '../types.js';
import {getConfig} from '../getConfig.js';
import {reducer} from '../reducer.js';
import BoxFocus from '../components/BoxFocus.js';
import TextField from '../components/TextField.js';
import NoCategoryFoundError from '../ui/NoCategoryFoundError.js';

interface InputFormProps {
    onSubmit: (category: Category, content: string) => void
}

export default function InputForm({ onSubmit }: InputFormProps) {
	const config = getConfig();
	const [{category, content, error, focusedElement, thoughts}, dispatch] =
		useReducer(reducer, {
			category: config.categories[0],
			content: '',
			focusedElement: 'content',
			thoughts: [],
			error: '',
		});

	useInput((_, key) => {
		if (key.tab) {
			dispatch({type: 'switchFocus'});
		}
	});

	const options: Option[] | undefined = config?.categories.map(category => ({
		label: category.name,
		value: category.placeholder,
	}));

	if (!category) return <NoCategoryFoundError />;

	return (
		<>
			<Box flexDirection="column" paddingLeft={1} paddingRight={1}>
				<Box>
					<BoxFocus isFocused={focusedElement === 'category'} paddingRight={2}>
						<SelectInput
							items={options}
							initialIndex={0}
							onHighlight={item => {
								dispatch({
									type: 'syncCategory',
									payload: {name: item.label, placeholder: item.value},
								});
							}}
							onSelect={item => {
								dispatch({
									type: 'selectCategory',
									payload: {name: item.label, placeholder: item.value},
								});
							}}
							isFocused={focusedElement === 'category'}
						/>
					</BoxFocus>
					<BoxFocus isFocused={focusedElement === 'content'} flexGrow={1}>
						<TextField
							placeholder={category.placeholder}
							value={content}
							onChange={value =>
								dispatch({type: 'syncContent', payload: value})
							}
							onSubmit={() => onSubmit(category, content)}
							isFocused={focusedElement === 'content'}
						/>
					</BoxFocus>
				</Box>
				<Text color="red" bold>
					{error}
				</Text>
				<Box borderColor="gray" flexDirection="column">
					{thoughts.map((thought, i) => (
						<Text key={`${thought.content}-${i}`}>
							{thought.category?.name} - {thought.content}
						</Text>
					))}
				</Box>
			</Box>
		</>
	);
}
