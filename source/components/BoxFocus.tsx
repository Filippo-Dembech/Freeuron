import {Box, BoxProps, Key, useFocus, useInput} from 'ink';
import React from 'react';

type FocusArgs = {
	isFocused: boolean,
	autoFocus?: boolean,
}
interface BoxFocusProps {
	isFocused?: boolean;
	autoFocus?: boolean;
	id?: string;
	onInput?: (input: string, key: Key) => void;
	renderFocusable: (focusArgs: FocusArgs) => React.ReactNode
}

export default function BoxFocus({
	renderFocusable,
	autoFocus = false,
		onInput,
	id,
	...props
}: BoxFocusProps & BoxProps) {
	const {isFocused} = useFocus({ autoFocus, id });
	useInput((input, key) => {
		if (isFocused && !key.tab) onInput?.(input, key)
	})
	return (
		<Box
			borderStyle={isFocused ? 'bold' : 'single'}
			borderColor={isFocused ? 'whiteBright' : 'white'}
            padding={1}
			{...props}
		>{renderFocusable({isFocused, autoFocus})}</Box>
	);
}
