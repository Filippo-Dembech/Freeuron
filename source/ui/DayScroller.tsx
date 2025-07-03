import BoxFocus from '../components/BoxFocus.js';
import {Focus} from '../Focus.js';
import Arrow from '../components/Arrow.js';
import Day from './Day.js';
import React from 'react';
import { Box, Key } from 'ink';
import { useDay } from '../context/DayContext.js';

export default function DayScroller() {
	
	const { setPreviousDay, setNextDay } = useDay();
	
	const handleInput = (input: string, _: Key) => {
		if(input === "k" || input === "l") {
			setNextDay();
		}
		if(input === "h" || input === "j") {
			setPreviousDay();
		}
	}

	return (
		<BoxFocus
			id={Focus.dayScroller}
			flexGrow={1}
			flexDirection='column'
            onInput={handleInput}
			renderFocusable={({isFocused}) => (
				<>
					<Box gap={3} justifyContent='space-between'>
						<Arrow toThe="left" label='PREVIOUS' bold={isFocused} underline={isFocused} />
						<Arrow toThe="right" label="NEXT" bold={isFocused} underline={isFocused}/>
					</Box>
					<Day flexGrow={1} />
				</>
			)}
		/>
	);
}
