import {useInput} from 'ink';
import TextInput, { Props as TextInputProps } from 'ink-text-input';
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
	const isDeleteMode = () => deleteMode.current;
	const activateDeleteMode = () => (deleteMode.current = true);
	const deactivateDeleteMode = () => (deleteMode.current = false);

	const removeLastword = () =>
		setContent(curr => curr.trim().split(' ').slice(0, -1).join(' '));
        
    const resetContent = () => setContent("");
    
	useInput((input, key) => {
		if (key.ctrl && input === 'w') {
			activateDeleteMode();
		}
	});

	useEffect(() => {
		if (isDeleteMode()) removeLastword()
		onChange(content);
        deactivateDeleteMode();
	}, [content]);

	return (
		<TextInput
			{...props}
			value={value}
			onChange={value => {
				setContent(value);
			}}
			onSubmit={() => {
				onSubmit?.(content);
                deactivateDeleteMode();
                resetContent();
			}}
		/>
	);
}
