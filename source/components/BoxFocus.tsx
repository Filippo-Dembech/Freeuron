import {Box, BoxProps, useFocus} from 'ink';
import React from 'react';

interface BoxFocusProps {
	isFocused?: boolean;
	renderFocusable: (isFocused: boolean) => React.ReactNode
}

export default function BoxFocus({
	renderFocusable,
	...props
}: BoxFocusProps & BoxProps) {
	const {isFocused} = useFocus();
	return (
		<Box
			borderStyle={isFocused ? 'bold' : 'single'}
			borderColor={isFocused ? 'whiteBright' : 'white'}
            padding={1}
			{...props}
		>{renderFocusable(isFocused)}</Box>
	);
}
