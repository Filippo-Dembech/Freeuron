import {Box, Text} from 'ink';
import React, {useEffect, useState} from 'react';
import {getConfig} from '../config.js';
import {Tab, Tabs} from 'ink-tab';
import {deleteThought, getThoughtsByCategory, toggleThought} from '../db.js';
import {Focus} from '../Focus.js';
import BigText from 'ink-big-text';
import SelectThought from '../ui/SelectThought.js';
import Focusable from '../components/Focusable.js';

export default function OverviewPage() {
	const {categories} = getConfig();
	const [category, setCategory] = useState(categories[0]);
	const [updateUI, setUpdateUI] = useState(false);

	useEffect(() => {
		setUpdateUI(false);
	}, [updateUI]);

	return (
		<Box gap={7}>
			<Box padding={2}>
				<Focusable
					id={Focus.filterTabs}
					nextFocus={[
						{
							to: Focus.thoughts,
							when: (_, key) => key.return,
						},
					]}
					renderComponent={({isFocused}) => (
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
					)}
				/>
			</Box>
			<Box flexDirection="column" paddingX={3} flexGrow={1} paddingBottom={2}>
				{category && getThoughtsByCategory(category).length !== 0 ? (
					<>
						<BigText text={category.name} font="tiny" />
						<SelectThought
							thoughts={getThoughtsByCategory(category)}
							showDate
							onDelete={thought => {
								deleteThought(thought.date, thought);
								setUpdateUI(true);
							}}
							onToggle={thought => {
								toggleThought(thought);
								setUpdateUI(true);
							}}
						/>
					</>
				) : (
					<Text color="gray">No thought</Text>
				)}
			</Box>
		</Box>
	);
}
