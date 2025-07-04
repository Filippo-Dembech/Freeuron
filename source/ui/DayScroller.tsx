import {Focus} from '../Focus.js';
import Arrow from '../components/Arrow.js';
import Day from './Day.js';
import React from 'react';
import {Box} from 'ink';
import {useDay} from '../context/DayContext.js';
import Focusable from '../components/Focusable.js';
import Container from '../components/Container.js';

export default function DayScroller() {
	const {setPreviousDay, setNextDay} = useDay();

	return (
		<Focusable
			id={Focus.dayScroller}
			nextFocus={[
				{
					to: Focus.dayTabs,
					when: (_, key) => key.return,
				},
			]}
			actions={[
				{
					on: input => input === 'k' || input === 'l',
					do: () => setNextDay(),
				},
				{
					on: input => input === 'h' || input === 'j',
					do: () => setPreviousDay(),
				},
			]}
			renderComponent={({isFocused}) => (
				<Container
					isFocused={isFocused}
					flexDirection="column"
					gap={1}
					flexGrow={1}
					paddingX={2}
					paddingY={1}
				>
					<Box justifyContent="space-between">
						<Arrow
							toThe="left"
							label="PREVIOUS"
							bold={isFocused}
							underline={isFocused}
						/>
						<Arrow
							toThe="right"
							label="NEXT"
							bold={isFocused}
							underline={isFocused}
						/>
					</Box>
					<Day flexGrow={1} />
				</Container>
			)}
		/>
	);
}
