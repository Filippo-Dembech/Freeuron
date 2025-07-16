import React from 'react';
import {Box, Text} from 'ink';
import BigText from 'ink-big-text';

interface Shortcut {
	keys: string;
	description: string;
}

interface PageShortcutsProps {
	pageName: string;
	shortcuts: Shortcut[];
}

function PageShortcuts({pageName, shortcuts}: PageShortcutsProps) {
	return (
		<Box flexDirection="column">
			<BigText text={pageName} font="tiny" />
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
	return (
		<Box flexDirection="column" gap={1}>
			<BigText text="Shortcuts" font="block" />
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
			<Box justifyContent="space-between" paddingX={5}>
				<PageShortcuts
					pageName="dashboard"
					shortcuts={[
						{keys: 'Ctrl + f', description: 'pages tabs'},
						{keys: 'Ctrl + o | alt + 1', description: 'categories selection'},
						{keys: 'Ctrl + e', description: 'thought content textfield'},
						{keys: 'Ctrl + d', description: 'days scroller'},
						{keys: 'Ctrl + t', description: 'current day categories'},
					]}
				/>
				<PageShortcuts
					pageName="Browse"
					shortcuts={[
						{keys: 'Ctrl + f', description: 'pages tabs'},
						{keys: 'Ctrl + o', description: 'categories selection'},
						{keys: 'Ctrl + t', description: 'current category thoughts'},
					]}
				/>
				<PageShortcuts
					pageName="Help"
					shortcuts={[{keys: 'Tab', description: 'pages tabs'}]}
				/>
			</Box>
		</Box>
	);
}
