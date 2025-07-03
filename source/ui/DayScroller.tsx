import BoxFocus from '../components/BoxFocus.js';
import {Focus} from '../Focus.js';
import Arrow from '../components/Arrow.js';
import Day from './Day.js';
import React from 'react';
import { Key } from 'ink';
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
			alignItems="center"
			gap={3}
            onInput={handleInput}
			renderFocusable={({}) => (
				<>
					<Arrow toThe="left" />
					<Day flexGrow={1} />
					<Arrow toThe="right" />
				</>
			)}
		/>
	);
}
