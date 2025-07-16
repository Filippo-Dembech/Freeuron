import {Box, Text, useFocus} from 'ink';
import React, {useEffect, useState} from 'react';
import {getConfig} from '../config.js';
import {Tab, Tabs} from 'ink-tab';
import {deleteThought, getAll, toggleThought} from '../db.js';
import {Focus} from '../Focus.js';
import BigText from 'ink-big-text';
import SelectThoughts from '../ui/SelectThoughts.js';
//import Checkbox from '../components/Checkbox.js';

export default function BrowsePage() {
	const {categories} = getConfig();
	const [category, setCategory] = useState(categories[0]);
	const [updateUI, setUpdateUI] = useState(false);

	useEffect(() => {
		setUpdateUI(false);
	}, [updateUI])

	const {isFocused} = useFocus({id: Focus.filterTabs});

	return (
		<Box gap={7}>
			<Box padding={2}>
				<Tabs
					colors={{
						activeTab: {color: 'blue', backgroundColor: 'black'},
					}}
					isFocused={isFocused}
					flexDirection="column"
					keyMap={{
						useNumbers: true,
						previous: ['k', 'l'],
						next: ['h', 'j'],
					}}
					onChange={tabName =>
						setCategory(categories.find(c => c.name === tabName))
					}
				>
					{categories.map((category, i) => (
						<Tab
							key={`${category.name}-${category.placeholder}-${i}`}
							name={category.name}
						>
							{category.name}
						</Tab>
					))}
				</Tabs>
			</Box>
			<Box borderStyle="single" flexGrow={1}>
				{category ? (
					<Box flexDirection="column" paddingLeft={3} paddingBottom={2}>
						<BigText text={category.name} font="tiny" />
						<SelectThoughts
							thoughts={getAll(category)}
							showDate
							onDelete={thought => {
								deleteThought(thought.date, thought)
								setUpdateUI(true);
							}}
							onToggle={thought => {
								toggleThought(thought)
								setUpdateUI(true);
							}}
						/>
					</Box>
				) : (
					<Text>No thought</Text>
				)}
			</Box>
		</Box>
	);
}
