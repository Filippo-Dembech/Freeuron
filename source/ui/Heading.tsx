import {Box} from 'ink';
import {DayType} from '../types.js';
import React from 'react';
import Title from '../components/Title.js';

interface HeadingProps {
	day: DayType;
}

export default function Heading({day}: HeadingProps) {
	return (
		<Box alignItems="flex-end">
			<Title color="blue">Freeuron</Title>
			<Title> - </Title>
			<Title>{day.date}</Title>
		</Box>
	);
}
