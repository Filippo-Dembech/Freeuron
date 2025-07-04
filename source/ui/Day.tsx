import {Box, BoxProps, Text, useFocus, useFocusManager, useInput} from 'ink';
import React, {useState} from 'react';
import BigText from 'ink-big-text';
import {Tab, Tabs} from 'ink-tab';
import {Focus} from '../Focus.js';
//import {Task} from 'ink-task-list';
import {useDay} from '../context/DayContext.js';
import SelectInput from 'ink-select-input';
import {DayType, Thought} from '../types.js';
import {Task} from 'ink-task-list';

function Thoughts({
	day,
	activeTab,
}: {
	day: DayType;
	activeTab: string | undefined;
}) {
	const {isFocused} = useFocus({id: Focus.thoughts});

	// 'undefined' because a day might have no thoughts
	const [_, setCurrentThought] = useState<Thought | undefined>(
		day.thoughts[0] || undefined,
	);
	const {focus} = useFocusManager();

	useInput((input, key) => {
		if (!isFocused) return;
		if (key.escape) focus(Focus.dayTabs);
		if (key.delete || input === 'd') console.log('delete thought?');
	});

	return (
		<Box flexDirection="column">
			<SelectInput
				isFocused={isFocused}
				itemComponent={({label: thoughtContent}) => (
					<Task label={thoughtContent} state="pending" />
				)}
				onHighlight={item => setCurrentThought(item.value)}
				items={day.thoughts
					.filter(thought => thought.category?.name === activeTab)
					.map((thought, i) => ({
						key: `${thought.category}-${thought.content}-${i}`,
						label: thought.content,
						value: thought,
					}))}
			/>
		</Box>
	);
}

export default function Day({...props}: BoxProps) {
	const {day} = useDay();
	const [activeTabName, setActiveTabName] = useState<string>();

	const {isFocused} = useFocus({id: Focus.dayTabs});
	const {focus} = useFocusManager();

	const categoryNames = [
		...new Set(day.thoughts.map(thought => thought.category?.name)),
	];

	useInput((_, key) => {
		if (!isFocused) return;
		if (key.return) focus(Focus.thoughts);
	});

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
						.sort(
							(a, b) =>
								a?.toLowerCase().localeCompare(b?.toLowerCase() || '') || 0,
						)
						.map((categoryName, i) => (
							<Tab key={`category-${i}`} name={categoryName || ''}>
								{categoryName}
							</Tab>
						))}
				</Tabs>
				<Thoughts day={day} activeTab={activeTabName} />
			</>
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
			</Box>
		</Box>
	);
}
