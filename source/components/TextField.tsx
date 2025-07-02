import {useInput} from 'ink';
import TextInput from 'ink-text-input';
import React, {useEffect} from 'react';
import {useRef, useState} from 'react';

interface TextFieldProps {
	placeholder: string;
	value: string;
	onChange: (value: string) => void;
	onSubmit: (value: string) => void;
	isFocused: boolean;
}

export default function TextField({
	placeholder,
	value,
	onChange,
	onSubmit,
	isFocused,
}: TextFieldProps) {
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
			removeLastword();
		}
	});

	useEffect(() => {
		onChange(content);
        deactivateDeleteMode();
	}, [content]);

	return (
		<TextInput
			placeholder={placeholder}
			value={content}
			onChange={value => {
				if (isDeleteMode()) return;
				setContent(value);
			}}
			onSubmit={() => {
				onSubmit(content);
                deactivateDeleteMode();
                resetContent();
			}}
			focus={isFocused}
		/>
	);
}
