import {Box, BoxProps} from 'ink';
import React, { useMemo } from 'react';
import BigText from 'ink-big-text';
import {useDay} from '../../../context/DayContext.js';
import {alphabetically} from '../../../utils/sort.js';
import NoCategories from './NoCategories.js';
import CategoryTabs from './CategoryTabs.js';
import SelectThought from '../../../ui/SelectThought.js';

export default function Day({...props}: BoxProps) {
	const {day, activeTab, setActiveTab, deleteThought, toggleThought} = useDay();
	const activeThoughts = useMemo(
		() => day.thoughts.filter(thought => thought.category?.name === activeTab),
		[day, activeTab],
	);
	const categoryNames = [
		...new Set(day.thoughts.map(thought => thought.category?.name)),
	].sort(alphabetically);
	const hasCategory = categoryNames.length !== 0;

	return (
		<Box
			alignItems={hasCategory ? 'stretch' : 'center'}
			justifyContent='space-between'
			{...props}
		>
			<Box minWidth={50}>
				<BigText text={day.date} font="tiny" />
			</Box>
			<Box flexDirection="column" flexGrow={1}  gap={1}>
				{hasCategory ? (
					<>
						<CategoryTabs onChange={setActiveTab} />
						<SelectThought
							thoughts={activeThoughts}
							onDelete={thought => {
								deleteThought(thought);
							}}
							onToggle={thought => {
								toggleThought(thought);
							}}
						/>
					</>
				) : (
					<NoCategories />
				)}
			</Box>
		</Box>
	);
}
