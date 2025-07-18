import React from 'react';
import {Box, Text} from 'ink';
import BigText from 'ink-big-text';
import { useTerminalSize } from '../hooks/useTerminalSize.js';
interface Shortcut {
	keys: string;
	description: string;
}

interface PageCardProps {
	pageName: string;
	description: string;
	shortcuts: Shortcut[];
}

function PageCard({pageName, description, shortcuts}: PageCardProps) {
	
	const [width] = useTerminalSize();
	const isSmallTerminal = width < 140

	return (
		<Box flexDirection="column" width="25%">
			{isSmallTerminal ? <Text underline bold>{pageName.toUpperCase()}</Text> : <BigText text={pageName} font="tiny" />}
			<Box marginBottom={1}>
				<Text color="whiteBright" bold>{description}</Text>
			</Box>
			{shortcuts.map((shortcut, i) => (
				<Box justifyContent="space-between" gap={2} key={`${shortcut.keys}-${i}`}>
					<Text color="gray" bold>
						{shortcut.keys}
					</Text>
					<Text>{shortcut.description}</Text>
				</Box>
			))}
		</Box>
	);
}

export default function HelpPage() {
	
	const [width] = useTerminalSize();
	const isSmallTerminal = width < 140

	return (
		<Box flexDirection="column" gap={1}>
			<BigText text="Shortcuts" font={isSmallTerminal ? "tiny" : "block"} />
			<Text>
				If you want, to can navigate throughout a page elements with just the{' '}
				<Text color="blue" bold>
					[Tab]
				</Text>{' '}
				button.
			</Text>
			<Text>
				DIRECTIONS: to select a specific <Text italic>Tab</Text> or{' '}
				<Text italic>Option</Text> press{' '}
				<Text color="blue" bold>
					j
				</Text>
				,{' '}
				<Text color="blue" bold>
					h
				</Text>{' '}
				to move forward (vertically or horizontally),{' '}
				<Text color="blue" bold>
					k
				</Text>
				,{' '}
				<Text color="blue" bold>
					l
				</Text>{' '}
				to move backward (vertically or horizontally)
			</Text>
			<Text>
				Use shortcuts to get the job done faster. Each shortcut brings the focus
				to a certain interface element:
			</Text>
			<Box justifyContent="space-around" flexWrap="wrap">
				<PageCard
					pageName="Dashboard"
					description="Here you can create new thoughts, check day thoughts by category or search a specific day."
					shortcuts={[
						{keys: 'Ctrl + f', description: 'pages tabs'},
						{keys: 'Ctrl + o | alt + 1', description: 'category selection'},
						{keys: 'Ctrl + e', description: 'thought content textfield'},
						{keys: 'Ctrl + d', description: 'days scroller'},
						{keys: 'Ctrl + t', description: 'current day categories'},
					]}
				/>
				<PageCard
					pageName="Overview"
					description='Overview page here mate'
					shortcuts={[
						{keys: 'Ctrl + f', description: 'pages tabs'},
						{keys: 'Ctrl + p', description: 'categories selection'},
						{keys: 'Ctrl + a', description: 'current category thoughts'},
					]}
				/>
				<PageCard
					pageName="Help"
					description="Help page to understand what's going on here."
					shortcuts={[
						{keys: 'Ctrl + f', description: 'page tabs'},
						{keys: 'Tab', description: 'page tabs'}
					]}
				/>
			</Box>
		</Box>
	);
}
