import React, {useReducer} from 'react';
import {Box, Text, useInput} from 'ink';
import SelectInput from 'ink-select-input';
import TextInput from 'ink-text-input';
import {Option} from './types.js';
import {getConfig} from './getConfig.js';
import { reducer } from './reducer.js';


export default function App() {
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

	if (!category)
		return (
			<Text color="yellow">
				No category has been found in 'freeuron.config.json' file. Press Ctrl +
				C to exit.
			</Text>
		);

	return (
		<>
		<Box flexDirection="column" padding={1}>
			<Box padding={1}>
				<Box
					borderStyle={focusedElement === 'category' ? 'bold' : 'single'}
					borderColor={focusedElement === 'category' ? 'whiteBright' : 'white'}
					padding={1}
 					paddingRight={2}
				>
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
				</Box>
				<Box
					borderStyle={focusedElement === 'content' ? 'bold' : 'single'}
					borderColor={focusedElement === 'content' ? 'whiteBright' : 'white'}
					padding={1}
					flexGrow={1}
				>
					<TextInput
						placeholder={category.placeholder}
						value={content}
						onChange={value => dispatch({type: 'syncContent', payload: value})}
						onSubmit={() => dispatch({type: 'addThough'})}
						focus={focusedElement === 'content'}
					/>
				</Box>
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
