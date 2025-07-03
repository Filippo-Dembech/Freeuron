import {getConfig} from './getConfig.js';
import NoCategoryFoundError from './ui/NoCategoryFoundError.js';
import React, {useState} from 'react';
import InputForm from './ui/InputForm.js';
import {createThought, createToday} from './db.js';
import {Thought} from './types.js';
import Heading from './ui/Heading.js';
import {useFocusManager, useInput} from 'ink';
import {Focus} from './Focus.js';
import DaysScroller from './ui/DaysScroller.js';

export default function App() {
	const config = getConfig();

	const [_, setThought] = useState<Thought>();
	const [currentDay, setCurrentDay] = useState(() => createToday());
	const {focus} = useFocusManager();

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
			<DaysScroller currentDay={currentDay} setDay={setCurrentDay}/>
		</>
	);
}
