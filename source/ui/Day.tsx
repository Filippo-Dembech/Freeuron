import {Box, Text} from 'ink';
import {DayType} from '../types.js';
import React from 'react';
import BigText from 'ink-big-text';

export default function Day({day}: {day: DayType}) {
	return (
		<Box borderStyle="round">
			<BigText text={day.date} font='tiny'/>
			<Box>
				{day.thoughts.map(thought => (
					<Text>
						<Text>{thought.category?.name.toUpperCase()}</Text> -{' '}
						{thought.content}
					</Text>
				))}
			</Box>
		</Box>
	);
}
