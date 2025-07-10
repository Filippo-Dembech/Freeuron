/*
import {Key, Text, useInput} from 'ink';
import TextInput, {Props as TextInputProps} from 'ink-text-input';
import React, {useRef, useState} from 'react';
import { deleteLastWord, removeLastLetter } from './utils/string.js';

type FieldProps = {
	onSubmit: (input: string) => void;
	flushOnSubmit?: boolean;
};

function Field({
	value,
	onChange,
	onSubmit,
	flushOnSubmit = true,
	...props
}: FieldProps & TextInputProps) {
	const [content, setContent] = useState(value);
	const mode = useRef('write');

	const getMode = (input: string, key: Key): string => {
		if (key.ctrl && input === 'w' && content !== '') return 'delete';
		if (input && key.ctrl) return 'idle';
		return 'write';
	};

	useInput((input, key) => {
		mode.current = getMode(input, key);
	});

	const handleInput = (input: string): string => {
		if (mode.current === 'delete') return deleteLastWord(input);
		if (mode.current === 'idle') return removeLastLetter(input);
		return input;
	};

	return (
		<TextInput
			{...props}
			key={content}
			value={content}
			onChange={inputValue => {
				const handledInput = handleInput(inputValue);
				setContent(handledInput);
				onChange(handledInput);
			}}
			onSubmit={() => {
				onSubmit(content);
				if (flushOnSubmit) setContent('');
				mode.current = "write";
			}}
		/>
	);
}

export default function Freeuron() {
	const [value, setValue] = useState('');

	return (
		<>
			<Field
				flushOnSubmit={false}
				placeholder='Test field here'
				value={value}
				onChange={setValue}
				onSubmit={input => console.log(input.toUpperCase())}
			/>
			<Text>{value}</Text>
		</>
	);
}
*/

import {getConfig} from './getConfig.js';
import NoCategoryFoundError from './ui/NoCategoryFoundError.js';
import React from 'react';
import InputForm from './ui/InputForm.js';
import Heading from './ui/Heading.js';
import DayScroller from './ui/DayScroller.js';
import {useDay} from './context/DayContext.js';
import {v4 as uuidv4} from 'uuid';
import Focusable from './components/Focusable.js';
import {Focus} from './Focus.js';

export default function Freeuron() {
	const config = getConfig();
	const {createThought} = useDay();

	if (config.categories.length === 0) return <NoCategoryFoundError />;

	return (
		<Focusable
			alwaysListening
			id="app"
			nextFocus={[
				{to: Focus.textField, when: (input, key) => key.ctrl && input === 'e'},
				{
					to: Focus.categorySelect,
					when: (input, key) =>
						(key.ctrl && input === 'o') || (key.meta && input === '1'),
				},
				{
					to: Focus.dayScroller,
					when: (input, key) => key.ctrl && input === 'd',
				},
				{
					to: Focus.categoryTabs,
					when: (input, key) => key.ctrl && input === 't',
				},
				{
					to: Focus.searchDayField,
					when: (input, key) => key.ctrl && input === 's',
				},
			]}
			renderComponent={() => (
				<>
					<Heading />
					<InputForm
						onSubmit={(category, content) => {
							const id = uuidv4();
							createThought({id, category, content, checked: false});
						}}
					/>
					<DayScroller />
				</>
			)}
		/>
	);
}
