import React from 'react';
import {Box, Text} from 'ink';

export default function HelpHint() {
	return (
		<Box>
			<Text bold>
				HELP: press{' '}
				<Text backgroundColor="yellowBright" color="black">
					{" Ctrl + q "}
				</Text>
			</Text>
		</Box>
	);
}
