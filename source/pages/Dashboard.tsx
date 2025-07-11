import React from 'react';
import InputForm from '../ui/InputForm.js';
import DayScroller from '../ui/DayScroller.js';
import {v4 as uuidv4} from 'uuid';
import {ThoughtProvider} from '../context/ThoughtContext.js';
import { useDay } from '../context/DayContext.js';

export default function Dashboard() {
    const {createThought} = useDay();
	return (
		<>
			<ThoughtProvider>
				<InputForm
					onSubmit={(category, content) => {
						const id = uuidv4();
						createThought({id, category, content, checked: false});
					}}
				/>
			</ThoughtProvider>
			<DayScroller />
		</>
	);
}
