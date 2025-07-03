import {Box, BoxProps, useFocus} from 'ink';
import React from 'react';

interface BoxFocusProps {
	isFocused?: boolean;
	autoFocus?: boolean;
	renderFocusable: (isFocused: boolean, autoFocus: boolean) => React.ReactNode
}

export default function BoxFocus({
	renderFocusable,
	autoFocus = false,
	...props
}: BoxFocusProps & BoxProps) {
	const {isFocused} = useFocus({ autoFocus });
	return (
		<Box
			borderStyle={isFocused ? 'bold' : 'single'}
			borderColor={isFocused ? 'whiteBright' : 'white'}
            padding={1}
			{...props}
		>{renderFocusable(isFocused, autoFocus)}</Box>
	);
}
