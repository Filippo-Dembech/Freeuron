import {Text} from 'ink';
import React from 'react';

type ArrowProps = {
	toThe: 'left' | 'right';
};

export default function Arrow({
	toThe,
}: ArrowProps) {

	return (
		<Text>
			{toThe === 'left' ? `<` : `>`}
		</Text>
	);
}
