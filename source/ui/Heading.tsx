import {Box} from 'ink';
import React from 'react';
import Title from '../components/Title.js';
import { useDay } from '../context/DayContext.js';

export default function Heading() {
	
	const { today } = useDay();
	return (
		<Box alignItems="flex-end">
			<Title color="blue">Freeuron</Title>
			<Title> - </Title>
			<Title>{today.date}</Title>
		</Box>
	);
}
