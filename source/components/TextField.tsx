import {useInput} from 'ink';
import TextInput, {Props as TextInputProps} from 'ink-text-input';
import React, {useEffect} from 'react';
import {useRef, useState} from 'react';

export default function TextField({
	value,
	onChange,
	onSubmit,
	...props
}: TextInputProps) {
	const [content, setContent] = useState(value);
	const deleteMode = useRef(false);
	const removeLetter = useRef(false);
	const isDeleteMode = () => deleteMode.current;
	const isRemoveLetter = () => removeLetter.current;
	const activateDeleteMode = () => (deleteMode.current = true);
	const deactivateDeleteMode = () => (deleteMode.current = false);
	const activateRemoveLetter = () => (removeLetter.current = true);
	const deactivateRemoveLetter = () => (removeLetter.current = false);

	const removeLastword = () =>
		setContent(curr => curr.trim().split(' ').slice(0, -1).join(' '));
	const removeLastLetter = () => setContent(curr => curr.slice(0, -1));

	const resetContent = () => setContent('');

	useInput((input, key) => {
		deactivateDeleteMode();
		deactivateRemoveLetter();
		if (key.ctrl && input === 'w') {
			activateDeleteMode();
		}
		if (
			(key.ctrl && input === 'o') ||
			(key.ctrl && input === 't') ||
			(key.ctrl && input === 'd')
		) {
			activateRemoveLetter();
		}
	});

	useEffect(() => {
		if (isDeleteMode()) removeLastword();
		if (isRemoveLetter()) removeLastLetter();
		onChange(content);
	}, [content]);

	return (
		<TextInput
			{...props}
			value={content}
			onChange={value => {
				setContent(value);
			}}
			onSubmit={() => {
				onSubmit?.(content);
				deactivateDeleteMode();
				deactivateRemoveLetter();
				resetContent();
			}}
		/>
	);
}
