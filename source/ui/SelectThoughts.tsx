import React from "react";
import { useEffect, useMemo, useState } from "react";
import { Thought } from "../types.js"
import Focusable from "../components/Focusable.js";
import { Focus } from "../Focus.js";
import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import { Task } from "ink-task-list";

interface SelectThoughtsProps {
    thoughts: Thought[];
    showDate?: boolean;
    onToggle?: (thought: Thought) => void
    onDelete?: (thought: Thought) => void
}

export default function SelectThoughts({ thoughts, showDate = false, onToggle, onDelete }: SelectThoughtsProps) {
	const [selectedThought, setSelectedThought] = useState<Thought | undefined>();
	const [confirmText, setConfirmText] = useState('');
	const canToggle = !confirmText; // if there is no confirm text user can toggle thought
	const deleteMode = confirmText !== '';

	useEffect(() => {
		setSelectedThought(thoughts[0]);
	}, [thoughts]);

	const resetConfirmText = () => {
		setConfirmText('');
	};

	const deleteSelectedThought = () => {
		if (!selectedThought) return;
        onDelete?.(selectedThought)
	};

	const memoizedItems = useMemo(
		() =>
			thoughts?.map((thought, i) => ({
				key: `${thought.category}-${thought.content}-${i}`,
				// because 'value' isn't seen as an 'item' property but label does,
				// I have decided to use string manipulation to make the backend
				// understand whether a thought were checked or not
				label: `${thought.content}::${
					thought.checked ? 'X' : '_'
				}::${thought.date}`,
				value: thought,
			})),
		[thoughts],
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
						items={memoizedItems}
						isFocused={isFocused}
						// don't know why but 'value' isn't seen as an 'item' property
						// So modified 'label' is used instead
						itemComponent={({label: thoughtContent, isSelected}) => {
                            const [content, check, date] = thoughtContent.split("::");
							const isChecked = check === "X";
							return (
								<Box gap={2}>
                                    <Task
                                        label={content ?? ""}
                                        state={isChecked ? 'success' : 'pending'}
									/>
                                    {showDate && <Text color="gray" italic>{date}</Text>}
                                    {isSelected && <Text color="white" backgroundColor="red">{confirmText}</Text>}
								</Box>
							);
						}}
						onHighlight={({value}) => {
							setSelectedThought(value);
							resetConfirmText();
						}}
						onSelect={({value}) => {
							if (canToggle) onToggle?.(value);
						}}
					/>
				</Box>
			)}
		/>
	);
}