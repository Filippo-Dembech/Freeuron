import React from 'react';
import Focusable from '../components/Focusable.js';
import {Focus} from '../Focus.js';
import {Tab, Tabs} from 'ink-tab';
import {useDay} from '../context/DayContext.js';
import {alphabetically} from '../utils/sort.js';

type CategoryTypeProps = {
	onChange: (tabName: string) => void;
};

export default function CategoryTabs({onChange}: CategoryTypeProps) {
	const {day, activeTab} = useDay();

	const categoryNames = [
		...new Set(day.thoughts.map(thought => thought.category?.name)),
	].sort(alphabetically);

	return (
		<Focusable
			id={Focus.categoryTabs}
			nextFocus={[
				{
					to: Focus.thoughts,
					when: (_, key) => key.return,
				},
			]}
			renderComponent={({isFocused}) => (
				<Tabs
					defaultValue={activeTab}
					keyMap={{
						useNumbers: true,
						previous: ['h', 'j'],
						next: ['k', 'l'],
					}}
					onChange={onChange}
					colors={{activeTab: {color: 'blue', backgroundColor: 'black'}}}
					isFocused={isFocused}
				>
					{categoryNames.sort(alphabetically).map((categoryName, i) => (
						<Tab key={`category-${i}`} name={categoryName || ''}>
							{categoryName}
						</Tab>
					))}
				</Tabs>
			)}
		/>
	);
}
