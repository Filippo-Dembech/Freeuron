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


// import {useInput} from 'ink';
// import TextInput, {Props as TextInputProps} from 'ink-text-input';
// import React, {useEffect} from 'react';
// import {useRef, useState} from 'react';

// type TextFieldProps = {
// 	flushWhenSubmit?: boolean;
// };

// export default function TextField({
// 	value,
// 	onChange,
// 	onSubmit,
// 	flushWhenSubmit = true,
// 	...props
// }: TextFieldProps & TextInputProps) {
// 	const [content, setContent] = useState(value);
// 	const deleteMode = useRef(false);
// 	const removeLetter = useRef(false);
// 	const isDeleteMode = () => deleteMode.current;
// 	const isRemoveLetter = () => removeLetter.current;
// 	const activateDeleteMode = () => (deleteMode.current = true);
// 	const deactivateDeleteMode = () => (deleteMode.current = false);
// 	const activateRemoveLetter = () => (removeLetter.current = true);
// 	const deactivateRemoveLetter = () => (removeLetter.current = false);

// 	const removeLastword = () =>
// 		setContent(curr => curr.trim().split(' ').slice(0, -1).join(' '));
// 	const removeLastLetter = () => setContent(curr => curr.slice(0, -1));

// 	const resetContent = () => setContent('');

// 	useInput((input, key) => {
// 		console.log("useInput() call")
// 		deactivateDeleteMode();
// 		deactivateRemoveLetter();
// 		if (key.ctrl && input === 'w') {
// 			activateDeleteMode();
// 		}
// 		if (
// 			(key.ctrl && input === 'o') ||
// 			(key.ctrl && input === 't') ||
// 			(key.ctrl && input === 'd') ||
// 			(key.ctrl && input === 's') ||
// 			(key.meta && input === '1')
// 		) {
// 			activateRemoveLetter();
// 		}
// 	});

// 	useEffect(() => {
// 		console.log("useEffect() call")
// 		if (isDeleteMode()) removeLastword();
// 		if (isRemoveLetter()) removeLastLetter();
// 		onChange(content);
// 	}, [content]);

// 	return (
// 		<TextInput
// 			{...props}
// 			value={value}
// 			onChange={setContent}
// 			onSubmit={() => {
// 				onSubmit?.(content);
// 				deactivateDeleteMode();
// 				deactivateRemoveLetter();
// 				if (flushWhenSubmit) resetContent();
// 			}}
// 		/>
// 	);
// }
