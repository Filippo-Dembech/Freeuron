import {getConfig} from './getConfig.js';
import NoCategoryFoundError from './ui/NoCategoryFoundError.js';
import React, {useState} from 'react';
import InputForm from './ui/InputForm.js';
import {createThought} from './db.js';
import {Thought} from './types.js';
import Heading from './ui/Heading.js';
import DayScroller from './ui/DayScroller.js';
import {useDay} from './context/DayContext.js';
import {v4 as uuidv4} from 'uuid';
import Focusable from './components/Focusable.js';
import { Focus } from './Focus.js';

export default function Freeuron() {
	const config = getConfig();
	const {day} = useDay();
	const [_, setThought] = useState<Thought>();

	if (config.categories.length === 0) return <NoCategoryFoundError />;

	return (
		<Focusable
			alwaysListening={true}
			id="app" nextFocus={[
				{ to: Focus.textField, when: (input, key) => key.ctrl && input === "e"},
				{ to: Focus.categorySelect, when: (input, key) => key.ctrl && input === "o"},
				{ to: Focus.dayScroller, when: (input, key) => key.ctrl && input === "d"},
				{ to: Focus.dayTabs, when: (input, key) => key.ctrl && input === "t"},
			]}
			renderComponent={() => (
				<>
					<Heading />
					<InputForm
						onSubmit={(category, content) => {
							const id = uuidv4();
							setThought({id, category, content, checked: false});
							createThought(day.date, {id, category, content, checked: false});
						}}
					/>
					<DayScroller />
				</>
			)}
		/>
	);
}
