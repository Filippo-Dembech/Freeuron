import React, {useReducer} from 'react';
import {Box, Text} from 'ink';
import SelectInput from 'ink-select-input';
import {Category} from '../types.js';
import {getConfig} from '../getConfig.js';
import {reducer} from '../reducer.js';
import TextField from '../components/TextField.js';
import NoCategoryFoundError from '../ui/NoCategoryFoundError.js';
import {Focus} from '../Focus.js';
import Focusable from '../components/Focusable.js';
import Container from '../components/Container.js';

export type Option = {
	label: string;
	value: Category;
};

interface InputFormProps {
	onSubmit: (category: Category, content: string) => void;
}

export default function InputForm({onSubmit}: InputFormProps) {
	const config = getConfig();
	//const {focus} = useFocusManager();
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
					<Focusable
						id={Focus.categorySelect}
						nextFocus={[
							{
								to: Focus.textField,
								when: (_, key) => key.return,
							},
						]}
						renderComponent={({isFocused}) => (
							<Container isFocused={isFocused} padding={1}>
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
							</Container>
						)}
					/>
					<Focusable
						id={Focus.textField}
						renderComponent={({isFocused}) => (
							<Container
								isFocused={isFocused}
								padding={1}
								flexGrow={1}
							>
								<TextField
									placeholder={category.placeholder || ''}
									value={content}
									onChange={value =>
										dispatch({type: 'syncContent', payload: value})
									}
									onSubmit={() => {
										if (!content)
											dispatch({
												type: 'setError',
												payload: "Text field content can't be empty.",
											});
										else onSubmit(category, content);
									}}
									focus={isFocused}
								/>
							</Container>
						)}
					/>
				</Box>
				<Text color="red" bold>
					{error}
				</Text>
			</Box>
		</>
	);
}
