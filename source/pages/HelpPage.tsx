import React from 'react';
import {Box, Text} from 'ink';
import BigText from 'ink-big-text';
import {useTerminalSize} from '../hooks/useTerminalSize.js';
import Code from '../components/Code.js';
import Em from '../components/Em.js';
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
	const isSmallTerminal = width < 150;

	return (
		<Box flexDirection="column" width="25%">
			{isSmallTerminal ? (
				<Text underline bold>
					{pageName.toUpperCase()}
				</Text>
			) : (
				<BigText text={pageName} font="tiny" />
			)}
			<Box marginBottom={1}>
				<Text color="whiteBright" bold>
					{description}
				</Text>
			</Box>
			{shortcuts.map((shortcut, i) => (
				<Box
					justifyContent="space-between"
					gap={2}
					key={`${shortcut.keys}-${i}`}
				>
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
	return (
		<Box flexDirection="column" gap={1} paddingX={4}>
			<Box alignItems="center" justifyContent="center" gap={3}>
				<Box
					flexDirection="column"
					gap={1}
					width="80%"
					borderStyle="round"
					paddingY={1}
					paddingX={4}
				>
					<Text>
						If you want, you can navigate throughout a page elements with just
						the <Code>[Tab]</Code> button.
					</Text>
					<Text>
						DIRECTIONS: to select a specific <Em>Tab</Em> or <Em>Option</Em>{' '}
						press <Code>j</Code>, <Code>h</Code> to move forward (vertically or
						horizontally), <Code>k</Code>, <Code>l</Code> to move backward (vertically or horizontally)
					</Text>
					<Text>
						Use shortcuts to get the job done faster. Each shortcut brings the
						focus to a certain interface element:
					</Text>
				</Box>
			</Box>
			<Box justifyContent="space-around" flexWrap="wrap">
				<PageCard
					pageName="Dashboard"
					description="Here you can stash new thoughts, check day thoughts by category or search a specific day thoughts."
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
					description="Here you can check out ALL your thoughts divided by category."
					shortcuts={[
						{keys: 'Ctrl + f', description: 'pages tabs'},
						{keys: 'Ctrl + p', description: 'categories selection'},
						{keys: 'Ctrl + a', description: 'current category thoughts'},
					]}
				/>
				<PageCard
					pageName="Help"
					description="Help page to understand how to use the app."
					shortcuts={[
						{keys: 'Ctrl + f', description: 'page tabs'},
						{keys: 'Tab', description: 'page tabs'},
					]}
				/>
			</Box>
		</Box>
	);
}
