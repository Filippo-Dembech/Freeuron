import {Box, BoxProps} from 'ink';
import React, {useEffect, useState} from 'react';
import BigText from 'ink-big-text';
import {useDay} from '../context/DayContext.js';
import Thoughts from './Thoughts.js';
import {alphabetically} from '../utils/sort.js';
import NoCategories from './NoCategories.js';
import CategoryTabs from './CategoryTabs.js';

export default function Day({...props}: BoxProps) {
	const {day} = useDay();
	const categoryNames = [
		...new Set(day.thoughts.map(thought => thought.category?.name)),
	].sort(alphabetically);
	const [activeTabName, setActiveTabName] = useState<string | undefined>("");
	
	useEffect(() => {
		if (!activeTabName)
			setActiveTabName(categoryNames[0])
	}, [day, categoryNames])
	
	return (
		<Box
			borderStyle="round"
			alignItems={categoryNames.length === 0 ? 'center' : 'stretch'}
			gap={8}
			{...props}
		>
			<BigText text={day.date} font="tiny" />
			<Box flexDirection="column" gap={1}>
				{activeTabName ? (
					<>
						<CategoryTabs onChange={setActiveTabName} />
						<Thoughts activeTab={activeTabName} />
					</>
				) : (
					<NoCategories />
				)}
			</Box>
		</Box>
	);
}
