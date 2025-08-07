import React from 'react';
import {Box, Text} from 'ink';
import Code from '../components/Code.js';

interface ProcedureProps {
	title: string;
	children: React.ReactNode;
}

function Procedure({title, children}: ProcedureProps) {
	return (
		<Text>
			-{' '}
			<Text bold backgroundColor="blue">
				{' ' + title.toUpperCase() + ' '}
			</Text>
			: {children}.
		</Text>
	);
}

export default function HowToPage() {
	return (
		<Box flexDirection="column" paddingTop={1} paddingX={2}>
			<Procedure title="create thought">
				Press <Code>Ctrl + o</Code>, select category, press <Code>Enter</Code>,
				insert text, press <Code>Enter</Code>
			</Procedure>
			<Procedure title="delete thought from dashboard">
				Press <Code>Ctrl + d</Code>, select day, press <Code>Enter</Code>,
				select category, press <Code>Enter</Code>, select thought, press{' '}
				<Code>d</Code>, press <Code>y</Code>
			</Procedure>
			<Procedure title="delete thought from overview">
				Press <Code>Ctrl + p</Code>, select day category, press{' '}
				<Code>Enter</Code>, select thought, press <Code>d</Code>, press{' '}
				<Code>y</Code>
			</Procedure>
			<Procedure title="delete already selected thought">
                Just press <Code>d</Code>, then <Code>y</Code>
			</Procedure>
			<Procedure title="toggle thought from dashboard">
				Press <Code>Ctrl + d</Code>, select day, press <Code>Enter</Code>,
				select category, press <Code>Enter</Code>, select thought, press{' '}
				<Code>Enter</Code> to toggle thought
			</Procedure>
			<Procedure title="toggle thought from overview">
				Press <Code>Ctrl + p</Code>, select day category, press{' '}
				<Code>Enter</Code>, select thought, press <Code>Enter</Code> to toggle
				thought{' '}
			</Procedure>
            <Procedure title='scroll throught days'>Press <Code>Ctrl + d</Code>, use <Code>h</Code>/<Code>l</Code> keys to navigate</Procedure>
			<Procedure title="select specific day">
				Press <Code>Ctrl + s</Code> type the day in the specified format (
				<Text dimColor>dd/mm/yyyy</Text>), press <Code>Enter</Code>. Now if you
				want to focus on categories press <Code>Ctrl + n</Code>
			</Procedure>
		</Box>
	);
}
