import {getConfig} from './getConfig.js';
import NoCategoryFoundError from './ui/NoCategoryFoundError.js';
import React, {useState} from 'react';
import InputForm from './ui/InputForm.js';
import {createThought, createToday, getNextDay, getPreviousDay} from './db.js';
import Day from './ui/Day.js';
import {Thought} from './types.js';
import Heading from './ui/Heading.js';
import {Box, useFocusManager, useInput} from 'ink';
import {Focus} from './Focus.js';
import Arrow from './components/Arrow.js';
import BoxFocus from './components/BoxFocus.js';

export default function App() {
	const config = getConfig();

	const [_, setThought] = useState<Thought>();
	const [currentDay] = useState(() => createToday());
	const {focus} = useFocusManager();

	console.log(`previous day = ${getPreviousDay(currentDay.date)?.date}`);
	console.log(`next day = ${getNextDay(currentDay.date)?.date}`);

	useInput((input, key) => {
		if (key.ctrl && input === 'e') {
			focus(Focus.textField);
		}
		if (key.ctrl && input === 'o') {
			focus(Focus.categorySelect);
		}
	});

	if (config.categories.length === 0) return <NoCategoryFoundError />;

	return (
		<>
			<Heading day={currentDay} />
			<InputForm
				onSubmit={(category, content) => {
					setThought({category, content});
					createThought(currentDay.date, {category, content});
				}}
			/>
			<Box alignItems="center" gap={3}>
				<BoxFocus
					id={Focus.day}
					flexGrow={1}
					alignItems="center"
					gap={3}
					renderFocusable={({}) => (
						<>
							<Arrow toThe="left" />
							<Day flexGrow={1} day={currentDay} />
							<Arrow toThe="right" />
						</>
					)}
				/>
			</Box>
		</>
	);
}
