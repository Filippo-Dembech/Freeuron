import SelectInput from 'ink-select-input';
import {Task} from 'ink-task-list';
import React, {useEffect, useMemo, useState} from 'react';
import Focusable from '../components/Focusable.js';
import {Focus} from '../Focus.js';
import {Box, Text} from 'ink';
import {useDay} from '../context/DayContext.js';
import {Thought} from '../types.js';

export default function Thoughts() {
	const {day, toggleThought, deleteThought, activeTab} = useDay();
	const activeThoughts = useMemo(
		() => day.thoughts.filter(thought => thought.category?.name === activeTab),
		[day, activeTab],
	);
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

	const memoizedItems = useMemo(
		() =>
			activeThoughts?.map((thought, i) => ({
				key: `${thought.category}-${thought.content}-${i}`,
				// because 'value' isn't seen as an 'item' property but label does,
				// I have decided to use string manipulation to make the backend
				// understand whether a thought were checked or not
				label: `${thought.content}::${
					thought.checked ? 'checked' : 'unchecked'
				}::`,
				value: thought,
			})),
		[activeThoughts],
	);

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
					on: input => deleteMode && input === 'n',
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
						// So modified 'label' is used instead
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
						items={memoizedItems}
					/>
				</Box>
			)}
		/>
	);
}
