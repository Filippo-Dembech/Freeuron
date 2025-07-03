import BoxFocus from '../components/BoxFocus.js';
import {Focus} from '../Focus.js';
import Arrow from '../components/Arrow.js';
import Day from './Day.js';
import React, {Dispatch, SetStateAction} from 'react';
import {DayType} from '../types.js';

type DaysScrollerProps = {
	currentDay: DayType;
	setDay: Dispatch<SetStateAction<DayType>>;
};

export default function DaysScroller({currentDay}: DaysScrollerProps) {

	return (
		<BoxFocus
			id={Focus.day}
			flexGrow={1}
			alignItems="center"
			gap={3}
            onInput={(input) => {
                console.log(input)
            }}
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
