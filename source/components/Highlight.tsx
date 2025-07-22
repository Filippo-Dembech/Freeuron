import React, {ReactNode} from 'react';
import {Text} from 'ink';

export default function Highlight({children}: {children: ReactNode}) {
	return (
		<Text backgroundColor="blueBright" color="black">
            {` ${children} `}
		</Text>
	);
}
