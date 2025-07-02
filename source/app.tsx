import {getConfig} from './getConfig.js';
import NoCategoryFoundError from './ui/NoCategoryFoundError.js';
import React, { useState } from 'react';
import InputForm from './ui/InputForm.js';
import Title from './components/Title.js';
import { createThought, createToday } from './db.js';
import Day from './ui/Day.js';
import { Box } from 'ink';
import { Thought } from './types.js';

export default function App() {
	const config = getConfig();

	const [_, setThought] = useState<Thought>();

	const today = createToday();
	
	if (config.categories.length === 0) return <NoCategoryFoundError />;

	return (
		<>
			<Box alignItems='flex-end'>
				<Title color='blue'>Freeuron</Title>
				<Title> - </Title>
				<Title>{today.date}</Title>
			</Box>
			<InputForm onSubmit={(category, content) => {
				setThought({ category, content })
				createThought(today.date, { category, content})
			}} />
			<Day day={today} />
		</>
	);
}
