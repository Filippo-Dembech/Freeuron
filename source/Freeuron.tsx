//import {getConfig} from './getConfig.js';
import NoCategoryFoundError from './ui/NoCategoryFoundError.js';
import React, {useState} from 'react';
import InputForm from './ui/InputForm.js';
import Heading from './ui/Heading.js';
import DayScroller from './ui/DayScroller.js';
import {useDay} from './context/DayContext.js';
import {v4 as uuidv4} from 'uuid';
import Focusable from './components/Focusable.js';
import {Focus} from './Focus.js';
import {ThoughtProvider} from './context/ThoughtContext.js';
import {Box, Text} from 'ink';
import {Tab, Tabs} from 'ink-tab';
import { getConfig } from './getConfig.js';

export default function Freeuron() {
	//const config = getConfig(); // keep it for debug purposes
	const config = getConfig();
	const {createThought} = useDay();
	const [activeUI, setActiveUI] = useState('dashboard');

	if (config.categories.length === 0) return <NoCategoryFoundError />;

	return (
		<Focusable
			alwaysListening
			id="app"
			nextFocus={[
				{to: Focus.textField, when: (input, key) => key.ctrl && input === 'e'},
				{
					to: Focus.categorySelect,
					when: (input, key) =>
						(key.ctrl && input === 'o') || (key.meta && input === '1'),
				},
				{
					to: Focus.dayScroller,
					when: (input, key) => key.ctrl && input === 'd',
				},
				{
					to: Focus.categoryTabs,
					when: (input, key) => key.ctrl && input === 't',
				},
				{
					to: Focus.searchDayField,
					when: (input, key) => key.ctrl && input === 's',
				},
				{
					to: Focus.uiFilters,
					when: (input, key) => key.ctrl && input === 'f',
				},
			]}
			renderComponent={() => (
				<>
					<Box alignItems="center" gap={4}>
						<Heading />
						<Focusable
							id={Focus.uiFilters}
							renderComponent={({isFocused}) => (
								<Tabs
									colors={{
										activeTab: {color: 'black', backgroundColor: 'blue'},
									}}
									isFocused={isFocused}
									flexDirection="column"
									keyMap={{
										useNumbers: true,
										previous: ['h', 'j'],
										next: ['k', 'l'],
									}}
									onChange={name => {
										setActiveUI(name);
									}}
								>
									<Tab name="dashboard">Dashboard</Tab>
									<Tab name="all">All</Tab>
								</Tabs>
							)}
						/>
					</Box>
					{activeUI === 'dashboard' ? (
						<>
							<ThoughtProvider>
								<InputForm
									onSubmit={(category, content) => {
										const id = uuidv4();
										createThought({id, category, content, checked: false});
									}}
								/>
							</ThoughtProvider>
							<DayScroller />
						</>
					) : (
						<Box>
							<Text>Test here</Text>
						</Box>
					)}
				</>
			)}
		/>
	);
}
