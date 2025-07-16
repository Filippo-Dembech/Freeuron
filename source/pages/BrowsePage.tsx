import {Box, Text, useFocus} from 'ink';
import React, {useState} from 'react';
import {getConfig} from '../config.js';
import {Tab, Tabs} from 'ink-tab';
import {getAll} from '../db.js';
import {Task} from 'ink-task-list';
import {Focus} from '../Focus.js';
import BigText from 'ink-big-text';

export default function BrowsePage() {
	const {categories} = getConfig();
	const [category, setCategory] = useState(categories[0]);

	const {isFocused} = useFocus({id: Focus.filterTabs});

	return (
		<Box>
			<Box gap={4}>
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
				<Box  borderStyle="single" width="100%">
					{category ? (
						<Box flexDirection="column" paddingLeft={3} paddingBottom={2}>
							<BigText text={category.name} font='tiny'/>
							{getAll(category).map(thought => (
								<Task
									key={thought.id}
									label={thought.content}
									state={thought.checked ? 'success' : 'pending'}
								/>
							))}
						</Box>
					) : (
						<Text>No thought</Text>
					)}
				</Box>
			</Box>
		</Box>
	);
}
