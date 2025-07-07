import {Box, BoxProps, Text} from 'ink';
import React, {useState} from 'react';
import BigText from 'ink-big-text';
import {Tab, Tabs} from 'ink-tab';
import {Focus} from '../Focus.js';
import {useDay} from '../context/DayContext.js';
import Focusable from '../components/Focusable.js';
import Thoughts from './Thoughts.js';
import { alphabetically } from '../utils/sort.js';

export default function Day({...props}: BoxProps) {
	const {day} = useDay();
	const [activeTabName, setActiveTabName] = useState<string>();

	const categoryNames = [
		...new Set(day.thoughts.map(thought => thought.category?.name)),
	];

	function handleTabChange(name: string) {
		setActiveTabName(name);
	}

	function renderNoCategories() {
		return (
			<Text italic color="gray">
				No thoughts yet
			</Text>
		);
	}

	function renderTabs(isFocused: boolean) {
		return (
			<>
				<Tabs
					keyMap={{
						useNumbers: true,
						previous: ['h', 'j'],
						next: ['k', 'l'],
					}}
					onChange={handleTabChange}
					colors={{activeTab: {color: 'blue', backgroundColor: 'black'}}}
					isFocused={isFocused}
				>
					{categoryNames
						.sort(alphabetically)
						.map((categoryName, i) => (
							<Tab key={`category-${i}`} name={categoryName || ''}>
								{categoryName}
							</Tab>
						))}
				</Tabs>
				<Thoughts activeTab={activeTabName} />
			</>
		);
	}

	return (
		<Focusable 
			id={Focus.dayTabs}
			nextFocus={[
				{
					to: Focus.thoughts,
					when: (_, key) => key.return,
				}
			]}
			renderComponent={({isFocused}) => (
				<Box
					borderStyle="round"
					alignItems={categoryNames.length === 0 ? 'center' : 'stretch'}
					gap={8}
					{...props}
				>
					<BigText text={day.date} font="tiny" />
					<Box flexDirection="column" gap={1}>
						{categoryNames.length ? renderTabs(isFocused) : renderNoCategories()}
					</Box>
				</Box>
			)}
		/>
	);
}
