import React from 'react';
import InputForm from '../ui/InputForm.js';
import DayScroller from '../ui/DayScroller.js';
import {v4 as uuidv4} from 'uuid';
import {ThoughtProvider} from '../context/ThoughtContext.js';
import {useDay} from '../context/DayContext.js';

export default function Dashboard() {
	const {day, createThought} = useDay();
	return (
		<>
			<ThoughtProvider>
				<InputForm
					onSubmit={(category, content) => {
						const id = uuidv4();
						createThought({
							id,
							date: day.date,
							category,
							content,
							checked: false,
						});
					}}
				/>
			</ThoughtProvider>
			<DayScroller />
		</>
	);
}
