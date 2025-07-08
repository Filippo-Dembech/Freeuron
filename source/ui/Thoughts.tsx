import SelectInput from 'ink-select-input';
import {Task} from 'ink-task-list';
import React, {useEffect, useMemo, useState} from 'react';
import Focusable from '../components/Focusable.js';
import {Focus} from '../Focus.js';
import {Box, Text} from 'ink';
import {useDay} from '../context/DayContext.js';
import {Thought} from '../types.js';

export default function Thoughts({activeTab}: {activeTab: string | undefined}) {
	const {day, toggleThought, deleteThought} = useDay();
	const activeThoughts = useMemo(() => day.thoughts.filter(
		thought => thought.category?.name === activeTab,
	), [day, activeTab]);
	const [selectedThought, setSelectedThought] = useState<Thought | undefined>();
	const [confirmText, setConfirmText] = useState('');
	const canToggle = !confirmText; // if there is no confirm text user can toggle thought
	const deleteMode = confirmText !== '';

	useEffect(() => {
		setSelectedThought(activeThoughts[0]);
	}, [activeThoughts]);

	const resetConfirmText = () => {
		setConfirmText('');
	};

	const deleteSelectedThought = () => {
		if (!selectedThought) return;
		deleteThought(selectedThought);
	};

	return (
		<Focusable
			id={Focus.thoughts}
			nextFocus={[
				{
					to: Focus.categoryTabs,
					when: (_, key) => key.escape,
				},
			]}
			actions={[
				{
					on: (input, key) => key.ctrl && input === 't',
					do: () => resetConfirmText(),
				},
				{
					on: input => deleteMode && input === 'y',
					do: () => {
						deleteSelectedThought();
						resetConfirmText();
					},
				},
				{
					on: (input, key) => key.delete || (input === 'd' && !key.ctrl),
					do: () => setConfirmText("Delete item? 'y/n'"),
				},
			]}
			renderComponent={({isFocused}) => (
				<Box flexDirection="column">
					<SelectInput
						isFocused={isFocused}
						// don't know why but 'value' isn't seen as an 'item' property
						itemComponent={({label: thoughtContent, isSelected}) => {
							const content = thoughtContent.replace(/::(un)?checked::$/, '');
							const isChecked = thoughtContent.includes('unchecked');
							return (
								<Box gap={2}>
									<Task
										label={content}
										state={isChecked ? 'pending' : 'success'}
									/>
									<Text color="white" backgroundColor="red">
										{isSelected && confirmText}
									</Text>
								</Box>
							);
						}}
						onHighlight={({value}) => {
							setSelectedThought(value);
							resetConfirmText();
						}}
						onSelect={({value}) => {
							if (canToggle) toggleThought(value);
						}}
						items={activeThoughts?.map((thought, i) => ({
							key: `${thought.category}-${thought.content}-${i}`,
							// because 'value' isn't seen as an 'item' property but label does,
							// I have decided to use string manipulation to make the backend
							// understand whether a thought were checked or not
							label: `${thought.content}::${
								thought.checked ? 'checked' : 'unchecked'
							}::`,
							value: thought,
						}))}
					/>
				</Box>
			)}
		/>
	);
}

/*
import SelectInput from 'ink-select-input';
import {DayType, Thought} from '../types.js';
import {Task} from 'ink-task-list';
import {deleteThought, toggleThought} from '../db.js';
import React, {useEffect, useState} from 'react';
import Focusable from '../components/Focusable.js';
import {Focus} from '../Focus.js';
import { Box, Text } from 'ink';

export default function Thoughts({
	day,
	activeTab,
}: {
	day: DayType;
	activeTab: string | undefined;
}) {

	// 'undefined' because a day might have no thoughts
	const [currentThought, setCurrentThought] = useState<Thought | undefined>(
		day.thoughts[0] || undefined,
	);
	const [updatedUI, setUpdateUI] = useState(false);
	const [confirmText, setConfirmText] = useState('');

	useEffect(() => {
		if (updatedUI) setUpdateUI(false);
	}, [updatedUI]);

	return (
		<Focusable
			id={Focus.thoughts}
			nextFocus={[
				{
					to: Focus.dayTabs,
					when: (_, key) => key.escape,
				}
			]}
			actions={[
				{
					on: (_, key) => key.return,
					do: () => {
						if (!confirmText) {
							toggleThought(day.date, currentThought)
							setUpdateUI(true)
						}
					}
				},
				{
					on: (input) => input === "n",
					do: () => {
						setConfirmText("")
					}
				},
				{
					on: (input) => input === "y",
					do: () => {
						deleteThought(day.date, currentThought);
						setCurrentThought(undefined);
						setConfirmText('');
					}
				},
				{
					on: (input, key) => key.delete || (input === 'd' && !key.ctrl),
					do: () => setConfirmText("Delete item? 'y/n'")
				}
			]}
			renderComponent={({isFocused}) => (
				<Box flexDirection="column">
					<SelectInput
						isFocused={isFocused}
						itemComponent={({label: thoughtContent}) => {
							const content = thoughtContent.replace(/::(un)?checked::$/, '');
							const isChecked = thoughtContent.includes('unchecked');
							return (
								<Box gap={2}>
									<Task
										label={content}
										state={isChecked ? 'pending' : 'success'}
									/>
									<Text color="white" backgroundColor="red">
										{currentThought?.content === content && confirmText}
									</Text>
								</Box>
							);
						}}
						onHighlight={item =>
							setCurrentThought(item.value || day.thoughts[0] || undefined)
						} // 'undefined' because the user might delete ALL the thoughts in one category
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
			)}
		/>
	);
}
*/
