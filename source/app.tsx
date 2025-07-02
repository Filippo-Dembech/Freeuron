import React, {useReducer} from 'react';
import {Box, Text, useInput} from 'ink';
import SelectInput from 'ink-select-input';
import {Option} from './types.js';
import {getConfig} from './getConfig.js';
import {reducer} from './reducer.js';
import Title from './components/Title.js';
import BoxFocus from './components/BoxFocus.js';
import TextField from './components/TextField.js';

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
			<>
				<Text color="yellow">
					No category has been found in 'freeuron.config.json' file. 
				</Text>
				<Text color="yellow">Please populate it with categories. For example:</Text>
				<Text>
					{`
{
    "categories": [
        {
            "name": "Todo",
            "placeholder": "Enter what you have to do..."
        },
        {
            "name": "Question",
            "placeholder": "Enter your question..."
        },
        {
            "name": "Insight",
            "placeholder": "Enter your discovery..."
        }
    ]
}

					`}
				</Text>
				<Text color="yellow">Press <Text bold>'Ctrl + C'</Text> to exit.</Text>
			</>

		);

	return (
		<>
			<Title>Freeuron</Title>
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
							onSubmit={() => dispatch({type: 'addThough'})}
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
