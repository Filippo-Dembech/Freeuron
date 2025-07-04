import {Box} from 'ink';
import React from 'react';
import Title from '../components/Title.js';
import {useDay} from '../context/DayContext.js';
import Gradient from 'ink-gradient';

export default function Heading() {
	const {today} = useDay();

	return (
		<Box alignItems="flex-end">
			<Gradient name="mind">
				<Title color="blue">Freeuron</Title>
			</Gradient>
			<Title> - </Title>
			<Title>{today.date}</Title>
		</Box>
	);
}
