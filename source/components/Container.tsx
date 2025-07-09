import {Box, BoxProps} from 'ink';
import React from 'react';
interface BoxFocusProps {
	isFocused?: boolean;
	children: React.ReactNode;
}

export default function Container({
	isFocused,
	children,
	...props
}: BoxFocusProps & BoxProps) {
	return (
		<Box
			borderStyle={isFocused ? 'bold' : 'single'}
			borderColor={isFocused ? 'whiteBright' : 'white'}
			{...props}
		>
			{children}
		</Box>
	);
}
