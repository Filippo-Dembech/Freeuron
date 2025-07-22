import {Text} from 'ink';
import React from 'react';

export default function NoCategoryFoundError() {
	return (
		<>
			<Text color="yellow">
				No category has been found in 'config.json' file.
			</Text>
			<Text color="yellow">
				Please populate it with categories. For example:
			</Text>
			<Text>
				{`
{
    "categories": [
        {
            "name": "Todo",
            "placeholder": "Enter what you have to do..."
        },
        {
            "name": "Question",
            "placeholder": "Enter your question..."
        },
        {
            "name": "Insight",
            "placeholder": "Enter your discovery..."
        }
    ]
}

					`}
			</Text>
			<Text color="yellow">
				Press <Text bold>'Ctrl + C'</Text> to exit.
			</Text>
		</>
	);
}
