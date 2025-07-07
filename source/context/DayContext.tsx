import {createContext, useContext, useState} from 'react';
import {DayType, Thought} from '../types.js';
import {createToday, getNextDay, getPreviousDay, syncThoughts} from '../db.js';
import React from 'react';

type DayContextValueType = {
	day: DayType;
	today: DayType;
	setPreviousDay: () => void;
	setNextDay: () => void;
	toggleThought: (thought: Thought) => void;
};

const DayContext = createContext<DayContextValueType | undefined>(undefined);

function DayProvider({children}: {children: React.ReactNode}) {
	const today = createToday();
	const [day, setDay] = useState<DayType>(today);

	const toggleThought = (targetThought: Thought) => {
		setDay(day => {
			day.thoughts.forEach(thought =>
				thought.id === targetThought.id
					? thought.checked = !thought.checked
					: thought,
			);
			syncThoughts(day, day.thoughts); // TODO: just pass 'day'
			return ({ ...day });
		});
	};

	function setPreviousDay() {
		setDay(day => getPreviousDay(day.date) || day);
	}

	function setNextDay() {
		setDay(day => getNextDay(day.date) || day);
	}

	return (
		<DayContext.Provider
			value={{day, setPreviousDay, setNextDay, today, toggleThought}}
		>
			{children}
		</DayContext.Provider>
	);
}

function useDay() {
	const result = useContext(DayContext);
	if (!result) throw new Error("'useDay()' is used outside DayContext.");
	return result;
}

export {DayProvider, useDay};
