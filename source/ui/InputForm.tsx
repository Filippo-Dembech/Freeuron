import React, {useReducer} from 'react';
import {Box, Text} from 'ink';
import SelectInput from 'ink-select-input';
import {Category} from '../types.js';
import {getConfig} from '../getConfig.js';
import {reducer} from '../reducer.js';
import BoxFocus from '../components/BoxFocus.js';
import TextField from '../components/TextField.js';
import NoCategoryFoundError from '../ui/NoCategoryFoundError.js';

export type Option = {
	label: string;
	value: Category;
};

interface InputFormProps {
	onSubmit: (category: Category, content: string) => void;
}

export default function InputForm({onSubmit}: InputFormProps) {
	const config = getConfig();
	const [{category, content, error}, dispatch] = useReducer(reducer, {
		category: config.categories[0],
		content: '',
		error: '',
	});

	const options: Option[] | undefined = config?.categories.map(category => ({
		key: `${category.name}-${category.placeholder}`, // without key error is thrown for <SelectInput/> uses 'value' as key - in this case 'value' is an object so it sees all keys are the same.
		label: category.name,
		value: category,
	}));

	if (!category) return <NoCategoryFoundError />;

	return (
		<>
			<Box flexDirection="column" paddingLeft={1} paddingRight={1}>
				<Box>
					<BoxFocus
						paddingRight={2}
						renderFocusable={isFocused => (
							<SelectInput
								items={options}
								initialIndex={0}
								onHighlight={item => {
									dispatch({
										type: 'syncCategory',
										payload: {
											name: item.label,
											placeholder: item.value.placeholder,
										},
									});
								}}
								onSelect={item => {
									dispatch({
										type: 'selectCategory',
										payload: {
											name: item.label,
											placeholder: item.value.placeholder,
										},
									});
								}}
								isFocused={isFocused}
							/>
						)}
					></BoxFocus>
					<BoxFocus
						flexGrow={1}
						autoFocus
						renderFocusable={(isFocused) => (
							<TextField
								placeholder={category.placeholder || ''}
								value={content}
								onChange={value =>
									dispatch({type: 'syncContent', payload: value})
								}
								onSubmit={() => onSubmit(category, content)}
								focus={isFocused}
							/>
						)}
					></BoxFocus>
				</Box>
				<Text color="red" bold>
					{error}
				</Text>
			</Box>
		</>
	);
}
