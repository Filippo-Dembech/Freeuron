import {Box, BoxProps, Text, useFocus} from 'ink';
import {DayType} from '../types.js';
import React, {useState} from 'react';
import BigText from 'ink-big-text';
import {Tab, Tabs} from 'ink-tab';
import {Focus} from '../Focus.js';
import {Task, TaskList} from 'ink-task-list';

export default function Day({day, ...props}: {day: DayType} & BoxProps) {
	const [activeTabName, setActiveTabName] = useState<string>();

	const {isFocused} = useFocus({id: Focus.dayTabs});

	const categoryNames = [
		...new Set(day.thoughts.map(thought => thought.category?.name)),
	];

	function handleTabChange(name: string) {
		setActiveTabName(name);
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
				{categoryNames.length ? (
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
						{categoryNames.map((categoryName, i) => (
							<Tab key={`category-${i}`} name={categoryName || ''}>
								{categoryName}
							</Tab>
						))}
					</Tabs>
				) : (
					<Text italic color="gray">
						No thoughts yet
					</Text>
				)}
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
