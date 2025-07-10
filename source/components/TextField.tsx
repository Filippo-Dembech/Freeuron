import {Key, useInput} from 'ink';
import TextInput, {Props as TextInputProps} from 'ink-text-input';
import React, {useRef, useState} from 'react';
import { deleteLastWord, removeLastLetter } from '../utils/string.js';

type FieldProps = {
	onSubmit: (input: string) => void;
	flushOnSubmit?: boolean;
};

export default function TextField({
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