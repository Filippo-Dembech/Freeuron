import {Box, Text, useFocus} from 'ink';
import {DayType} from '../types.js';
import React, {useState} from 'react';
import BigText from 'ink-big-text';
import {Tab, Tabs} from 'ink-tab';

export default function Day({day}: {day: DayType}) {
	const [activeTabName, setActiveTabName] = useState<string>();
	
	const {isFocused} = useFocus()

	const categoryNames = [
		...new Set(day.thoughts.map(thought => thought.category?.name)),
	];

	function handleTabChange(name: string) {
		setActiveTabName(name);
	}

	return (
		<Box borderStyle="round" gap={8}>
			<BigText text={day.date} font="tiny" />
			<Box flexDirection="column" gap={1}>
				<Tabs
					onChange={handleTabChange}
					colors={{activeTab: {color: 'blue', backgroundColor: 'black'}}}
					isFocused={isFocused}
				>
					{categoryNames.map((categoryName, i) => (
						<Tab key={`${categoryName}-${i}`} name={categoryName || ''}>
							{categoryName}
						</Tab>
					))}
				</Tabs>
				<Box flexDirection="column">
					{day.thoughts
						.filter(thought => thought.category?.name === activeTabName)
						.map((thought, i) => (
							<Text key={`${thought}-${i}`}>
								{thought.category?.name} - {thought.content}
							</Text>
						))}
				</Box>
			</Box>
		</Box>
	);
}
