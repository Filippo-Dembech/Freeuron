import {getConfig} from './getConfig.js';
import NoCategoryFoundError from './ui/NoCategoryFoundError.js';
import React from 'react';
import InputForm from './ui/InputForm.js';
import Title from './components/Title.js';
import { createToday } from './db.js';
import Day from './ui/Day.js';
import { Box } from 'ink';

export default function App() {
	const config = getConfig();

	const today = createToday();
	//const {days} = db.data;

	if (config.categories.length === 0) return <NoCategoryFoundError />;

	return (
		<>
			<Box alignItems='flex-end'>
				<Title color='blue'>Freeuron</Title>
				<Title> - </Title>
				<Title>{today.date}</Title>
			</Box>
			<InputForm onSubmit={() => {}} />
			<Day day={today}/>
		</>
	);
}
