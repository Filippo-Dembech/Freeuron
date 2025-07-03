import {getConfig} from './getConfig.js';
import NoCategoryFoundError from './ui/NoCategoryFoundError.js';
import React, {useState} from 'react';
import InputForm from './ui/InputForm.js';
import {createThought} from './db.js';
import {Thought} from './types.js';
import Heading from './ui/Heading.js';
import {useFocusManager, useInput} from 'ink';
import {Focus} from './Focus.js';
import DayScroller from './ui/DayScroller.js';
import { useDay } from './context/DayContext.js';

export default function Freeuron() {
	const config = getConfig();
	const { day } = useDay();
	const [_, setThought] = useState<Thought>();
	const {focus} = useFocusManager();

	useInput((input, key) => {
		if (key.ctrl && input === 'e') {
			focus(Focus.textField);
		}
		if (key.ctrl && input === 'o') {
			focus(Focus.categorySelect);
		}
		if (key.ctrl && input === "d") {
			focus(Focus.dayScroller)
		}
		if (key.ctrl && input === "t") {
			focus(Focus.dayTabs);
		}
	});

	if (config.categories.length === 0) return <NoCategoryFoundError />;

	return (
		<>
			<Heading />
			<InputForm
				onSubmit={(category, content) => {
					setThought({category, content});
					createThought(day.date, {category, content});
				}}
			/>
			<DayScroller />
		</>
	);
}
