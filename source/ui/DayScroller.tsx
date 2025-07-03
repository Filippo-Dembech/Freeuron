import BoxFocus from '../components/BoxFocus.js';
import {Focus} from '../Focus.js';
import Arrow from '../components/Arrow.js';
import Day from './Day.js';
import React, {Dispatch, SetStateAction} from 'react';
import {DayType} from '../types.js';
import { Key } from 'ink';
import { getNextDay, getPreviousDay } from '../db.js';

type DayScrollerProps = {
	currentDay: DayType;
	setDay: Dispatch<SetStateAction<DayType>>;
};

export default function DayScroller({currentDay, setDay}: DayScrollerProps) {
	
	const handleInput = (input: string, _: Key) => {
		if(input === "k" || input === "l") {
			setDay(getNextDay(currentDay.date) || currentDay);
		}
		if(input === "h" || input === "j") {
			setDay(getPreviousDay(currentDay.date) || currentDay);
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
					<Day flexGrow={1} day={currentDay} />
					<Arrow toThe="right" />
				</>
			)}
		/>
	);
}
