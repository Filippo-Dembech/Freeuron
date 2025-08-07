import React from 'react';
import {Box, Text} from 'ink';
import BigText from 'ink-big-text';
import {useTerminalSize} from '../hooks/useTerminalSize.js';
import Code from '../components/Code.js';
import Em from '../components/Em.js';
import Highlight from '../components/Highlight.js';
import { Arrows } from '../utils/Arrows.js';

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
		<Box flexDirection="column" width="30%">
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
					borderStyle="singleDouble"
					borderTop={false}
					borderLeft={false}
					borderRight={false}
					paddingY={1}
				>
					<Box>
						<Box flexBasis="70%">
							<Text>
								<Highlight>DIRECTIONS</Highlight> To navigate <Em>Tab</Em> or{' '}
								<Em>Option</Em> use <Code>h</Code> to move left {Arrows.left},{' '}
								<Code>j</Code> to move down {Arrows.down}, <Code>k</Code> to
								move up {Arrows.up}, and <Code>l</Code> to move right{' '}
								{Arrows.right}.
							</Text>
						</Box>
						<Box flexBasis="30%" justifyContent='center'>
							<Box borderStyle="round">
								<Text>h {Arrows.left}</Text>
							</Box>
							<Box borderStyle="round">
								<Text>j {Arrows.down}</Text>
							</Box>
							<Box borderStyle="round">
								<Text>k {Arrows.up}</Text>
							</Box>
							<Box borderStyle="round">
								<Text>l {Arrows.right}</Text>
							</Box>
						</Box>
					</Box>
					<Text>
						<Highlight>PAGES</Highlight> To change page just press{' '}
						<Code>Ctrl + f</Code> and use the direction buttons to change the
						current page.
					</Text>
					<Text>
						<Highlight>NAVIGATE</Highlight> You can move through the page
						elements using just the <Code>[Tab]</Code> key.
					</Text>
					<Text>
						Want to be quicker? Use the shortcuts below! Each one jumps straight
						to a specific part of the interface
					</Text>
				</Box>
			</Box>
			<Box justifyContent="space-around" flexWrap="wrap">
				<PageCard
					pageName="Dashboard"
					description="Here you can stash new thoughts, check day thoughts by category or search a specific day thoughts."
					shortcuts={[
						{keys: 'Ctrl + o | alt + 1', description: 'category selection'},
						{keys: 'Ctrl + e', description: 'thought content textfield'},
						{keys: 'Ctrl + d', description: 'days scroller'},
						{keys: 'Ctrl + n', description: 'Category tabs'},
						{keys: 'Ctrl + t', description: 'current day categories'},
					]}
				/>
				<PageCard
					pageName="Overview"
					description="Here you can check out ALL your thoughts divided by category."
					shortcuts={[
						{keys: 'Ctrl + p', description: 'categories selection'},
						{keys: 'Ctrl + a', description: 'current category thoughts'},
					]}
				/>
				<PageCard
					pageName="Help"
					description="Help page to understand how to use the app."
					shortcuts={[
						{keys: 'Ctrl + f', description: 'page tabs'},
					]}
				/>
			</Box>
		</Box>
	);
}
