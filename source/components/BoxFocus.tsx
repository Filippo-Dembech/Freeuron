import {Box, BoxProps} from 'ink';
import React from 'react';

interface BoxFocusProps {
	isFocused?: boolean;
    children: React.ReactNode
}

export default function BoxFocus({
	isFocused,
    children,
	...props
}: BoxFocusProps & BoxProps) {
	return (
		<Box
			borderStyle={isFocused ? 'bold' : 'single'}
			borderColor={isFocused ? 'whiteBright' : 'white'}
            padding={1}
			{...props}
		>{children}</Box>
	);
}
