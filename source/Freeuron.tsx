import {getConfig} from './getConfig.js';
import NoCategoryFoundError from './ui/NoCategoryFoundError.js';
import React from 'react';
import InputForm from './ui/InputForm.js';
import Heading from './ui/Heading.js';
import DayScroller from './ui/DayScroller.js';
import {useDay} from './context/DayContext.js';
import {v4 as uuidv4} from 'uuid';
import Focusable from './components/Focusable.js';
import {Focus} from './Focus.js';

export default function Freeuron() {
	const config = getConfig();
	const {createThought} = useDay();

	if (config.categories.length === 0) return <NoCategoryFoundError />;

	return (
		<Focusable
			alwaysListening
			id="app"
			nextFocus={[
				{to: Focus.textField, when: (input, key) => key.ctrl && input === 'e'},
				{
					to: Focus.categorySelect,
					when: (input, key) => key.ctrl && input === 'o' || key.meta && input === "1",
				},
				{
					to: Focus.dayScroller,
					when: (input, key) => key.ctrl && input === 'd',
				},
				{
					to: Focus.categoryTabs,
					when: (input, key) => key.ctrl && input === 't',
				},
				{
					to: Focus.searchDayField,
					when: (input, key) => key.ctrl && input === 's',
				},
			]}
			renderComponent={() => (
				<>
					<Heading />
					<InputForm
						onSubmit={(category, content) => {
							const id = uuidv4();
							createThought({id, category, content, checked: false});
						}}
					/>
					<DayScroller />
				</>
			)}
		/>
	);
}
