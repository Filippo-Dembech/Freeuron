import {Text, TextProps} from 'ink';
import React from 'react';

type ArrowProps = {
	toThe: 'left' | 'right';
	label?: string;
};

export default function Arrow({
	toThe,
	label,
	...props
}: ArrowProps & TextProps) {

	return (
		<Text {...props}>
			{toThe === 'left' ? `< ${label}` : `${label} >`}
		</Text>
	);
}
