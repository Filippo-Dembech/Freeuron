import {Box, BoxProps, useFocus} from 'ink';
import React from 'react';

type FocusArgs = {
	isFocused: boolean,
	autoFocus?: boolean,
}
interface BoxFocusProps {
	isFocused?: boolean;
	autoFocus?: boolean;
	id?: string;
	renderFocusable: (focusArgs: FocusArgs) => React.ReactNode
}

export default function BoxFocus({
	renderFocusable,
	autoFocus = false,
	id,
	...props
}: BoxFocusProps & BoxProps) {
	const {isFocused} = useFocus({ autoFocus, id });
	return (
		<Box
			borderStyle={isFocused ? 'bold' : 'single'}
			borderColor={isFocused ? 'whiteBright' : 'white'}
            padding={1}
			{...props}
		>{renderFocusable({isFocused, autoFocus})}</Box>
	);
}
