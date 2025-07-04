import {Box, BoxProps, Text, useFocus} from 'ink';
import React, {useState} from 'react';
import BigText from 'ink-big-text';
import {Tab, Tabs} from 'ink-tab';
import {Focus} from '../Focus.js';
import {Task, TaskList} from 'ink-task-list';
import {useDay} from '../context/DayContext.js';

export default function Day({...props}: BoxProps) {
	const {day} = useDay();
	const [activeTabName, setActiveTabName] = useState<string>();

	const {isFocused} = useFocus({id: Focus.dayTabs});

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

	function renderTabs() {
		return (
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
				{categoryNames.sort((a, b) => a?.toLowerCase().localeCompare(b?.toLowerCase() || "") || 0).map((categoryName, i) => (
					<Tab key={`category-${i}`} name={categoryName || ''}>
						{categoryName}
					</Tab>
				))}
			</Tabs>
		);
	}

	return (
		<Box
			borderStyle="round"
			alignItems={categoryNames.length === 0 ? 'center' : 'stretch'}
			gap={8}
			{...props}
		>
			<BigText text={day.date} font="tiny" />
			<Box flexDirection="column" gap={1}>
				{categoryNames.length ? renderTabs() : renderNoCategories()}
				<Box flexDirection="column">
					{day.thoughts
						.filter(thought => thought.category?.name === activeTabName)
						.map((thought, i) => (
							<TaskList key={`thought-${i}`}>
								<Task label={thought.content} state="pending" />
							</TaskList>
						))}
				</Box>
			</Box>
		</Box>
	);
}
