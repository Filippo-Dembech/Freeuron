import {Box, Text} from 'ink';
import React from 'react';
import Title from '../components/Title.js';
import {useDay} from '../context/DayContext.js';
import Gradient from 'ink-gradient';
import { useTerminalSize } from '../hooks/useTerminalSize.js';

export default function Heading() {
	const {today} = useDay();
	const [width] = useTerminalSize()
	const isSmallSize = width < 140;

	return (
		<Box flexDirection={isSmallSize ? "column" : "row"}>
			<Gradient name="mind">
				<Title color="blue">Freeuron</Title>
			</Gradient>
			{!isSmallSize && <Title> - </Title>}
			{isSmallSize ? <Text bold>Today: {today.date}</Text> : <Title>{today.date}</Title>}
		</Box>
	);
}
