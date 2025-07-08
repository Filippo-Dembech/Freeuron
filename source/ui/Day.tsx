import {Box, BoxProps} from 'ink';
import React from 'react';
import BigText from 'ink-big-text';
import {useDay} from '../context/DayContext.js';
import Thoughts from './Thoughts.js';
import {alphabetically} from '../utils/sort.js';
import NoCategories from './NoCategories.js';
import CategoryTabs from './CategoryTabs.js';

export default function Day({...props}: BoxProps) {
	const {day, setActiveTab} = useDay();
	const categoryNames = [
		...new Set(day.thoughts.map(thought => thought.category?.name)),
	].sort(alphabetically);
	const noCategory = categoryNames.length === 0;
	
	return (
		<Box
			borderStyle="round"
			alignItems={noCategory ? 'center' : 'stretch'}
			gap={8}
			{...props}
		>
			<BigText text={day.date} font="tiny" />
			<Box flexDirection="column" gap={1}>
				{!noCategory ? (
					<>
						<CategoryTabs onChange={setActiveTab} />
						<Thoughts />
					</>
				) : (
					<NoCategories />
				)}
			</Box>
		</Box>
	);
}
