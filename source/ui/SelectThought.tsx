import React, { useEffect } from "react";
import { useState } from "react";
import { Thought } from "../types.js"
import Focusable from "../components/Focusable.js";
import { Focus } from "../Focus.js";
import { Box, Text } from "ink";
import { Task } from "ink-task-list";
import Container from "../components/Container.js";
import Select from "../components/Select.js";
import { usePage } from "../context/PageContext.js";

interface SelectThoughtProps {
    thoughts: Thought[];
    showDate?: boolean;
	//isFocused?: boolean;
    onToggle?: (thought: Thought) => void
    onDelete?: (thought: Thought) => void
}

export default function SelectThought({ thoughts, showDate = false, onToggle, onDelete }: SelectThoughtProps) {
	const [confirmText, setConfirmText] = useState('');
	const [selectedThought, setSelectedThought] = useState<Thought | undefined>()
	const {activePage} = usePage()
	const canToggle = !confirmText; // if there is no confirm text user can toggle thought
	const deleteMode = confirmText !== '';
	
	useEffect(() => {
		setSelectedThought(thoughts[0])
	}, [thoughts])

	const resetConfirmText = () => {
		setConfirmText('');
	};
	
	return (
		<Focusable
			id={Focus.thoughts}
			nextFocus={[
				{
					to: activePage === "dashboard" ? Focus.categoryTabs : Focus.filterTabs,
					when: (_, key) => key.escape,
				}
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
						if (selectedThought) onDelete?.(selectedThought);
						resetConfirmText();
					},
				},
				{
					on: (input, key) => key.delete || (input === 'd' && !key.ctrl),
					do: () => setConfirmText("Delete item? 'y/n'"),
				},
			]}
			renderComponent={({isFocused}) => (
				<Container isFocused={isFocused} flexGrow={1} paddingX={2} paddingY={1}>
					<Select
						items={thoughts}
						labelFrom={thought => thought.id}
						isFocused={isFocused}
						// don't know why but 'value' isn't seen as an 'item' property
						// So modified 'label' is used instead
						renderItem={(thought, isSelected) => {
							return (
								<Box gap={2}>
                                    <Task
                                        label={thought?.content ?? ""}
                                        state={thought?.checked ? 'success' : 'pending'}
									/>
                                    {showDate && <Text color="gray" italic>{thought?.date}</Text>}
                                    {isSelected && <Text color="white" backgroundColor="red">{confirmText}</Text>}
								</Box>
							);
						}}
						onHighlight={(thought) => {
							setSelectedThought(thought)
							resetConfirmText()
						}}
						onSelect={(thought) => {
							if (canToggle) onToggle?.(thought);
						}}
					/>
				</Container>
			)}
		/>
	);
}