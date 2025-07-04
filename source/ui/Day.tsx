import {Box, BoxProps, Text, useFocus, useFocusManager, useInput} from 'ink';
import React, {useEffect, useState} from 'react';
import BigText from 'ink-big-text';
import {Tab, Tabs} from 'ink-tab';
import {Focus} from '../Focus.js';
import {useDay} from '../context/DayContext.js';
import SelectInput from 'ink-select-input';
import {DayType, Thought} from '../types.js';
import {Task} from 'ink-task-list';
import {deleteThought, toggleThought} from '../db.js';

function Thoughts({
	day,
	activeTab,
}: {
	day: DayType;
	activeTab: string | undefined;
}) {
	const {isFocused} = useFocus({id: Focus.thoughts});

	// 'undefined' because a day might have no thoughts
	const [currentThought, setCurrentThought] = useState<Thought | undefined>(
		day.thoughts[0] || undefined,
	);
	const [updatedUI, setUpdateUI] = useState(false);
	const [confirmText, setConfirmText] = useState('');
	const {focus} = useFocusManager();

	useEffect(() => {
		if (updatedUI) setUpdateUI(false);
	}, [updatedUI]);

	useInput((input, key) => {
		if (!isFocused) return;
		if (!confirmText && key.return) {
			toggleThought(day.date, currentThought);
			setUpdateUI(true);
		}
		if (confirmText && input === 'n') setConfirmText('');
		if (confirmText && input === 'y') {
			deleteThought(day.date, currentThought);
			setCurrentThought(undefined);
			setConfirmText('');
		}
		if (key.escape) focus(Focus.dayTabs);
		if (key.delete || input === 'd' && !key.ctrl) {
			setConfirmText('Delete Item? y/n');
		}
	});

	return (
		<Box flexDirection="column">
			<SelectInput
				isFocused={isFocused}
				itemComponent={({label: thoughtContent}) => {
					const content = thoughtContent.replace(/::(un)?checked::$/, '');
					const isChecked = thoughtContent.includes('unchecked');
					return (
						<Box gap={2}>
							<Task label={content} state={isChecked ? 'pending' : 'success'} />
							<Text color="red">
								{currentThought?.content === content && confirmText}
							</Text>
						</Box>
					);
				}}
				onHighlight={item => setCurrentThought(item.value || day.thoughts[0] || undefined)} // 'undefined' because the user might delete ALL the thoughts in one category
				items={day.thoughts
					.filter(thought => thought.category?.name === activeTab)
					.map((thought, i) => ({
						key: `${thought.category}-${thought.content}-${i}`,
						label: `${thought.content}::${
							thought.checked ? 'checked' : 'unchecked'
						}::`,
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
