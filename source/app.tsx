import {getConfig} from './getConfig.js';
import NoCategoryFoundError from './ui/NoCategoryFoundError.js';
import React, { useState } from 'react';
import InputForm from './ui/InputForm.js';
import { createThought, createToday } from './db.js';
import Day from './ui/Day.js';
import { Thought } from './types.js';
import Heading from './ui/Heading.js';

export default function App() {
	const config = getConfig();

	const [_, setThought] = useState<Thought>();

	const today = createToday();
	
	if (config.categories.length === 0) return <NoCategoryFoundError />;

	return (
		<>
			<Heading day={today} />
			<InputForm onSubmit={(category, content) => {
				setThought({ category, content })
				createThought(today.date, { category, content})
			}} />
			<Day day={today} />
		</>
	);
}
