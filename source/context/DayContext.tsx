import {createContext, useContext, useEffect, useState} from 'react';
import {DayType, Thought} from '../types.js';
import {
	createDBThought,
	createToday,
	getNextDay,
	getPreviousDay,
	syncThoughts,
} from '../db.js';
import React from 'react';

type DayContextValueType = {
	day: DayType;
	today: DayType;
	createThought: (date: string, thought: Thought) => void;
	deleteThought: (thought: Thought) => void;
	setPreviousDay: () => void;
	setNextDay: () => void;
	toggleThought: (thought: Thought) => void;
};

const DayContext = createContext<DayContextValueType | undefined>(undefined);

function DayProvider({children}: {children: React.ReactNode}) {
	const today = createToday();
	const [day, setDay] = useState<DayType>(today);

	useEffect(() => {
		syncThoughts(day, day.thoughts);
	}, [day]);

	const createThought = (date: string, thought: Thought) => {
		setDay(day => ({...day, thoughts: [...day.thoughts, thought]}));
		createDBThought(date, thought);
	};

	const toggleThought = (targetThought: Thought) => {
		setDay(day => ({
			...day,
			thoughts: day.thoughts.map(thought =>
				thought.id === targetThought.id
					? {...thought, checked: !thought.checked}
					: thought,
			),
		}));
	};

	function deleteThought(targetThought: Thought) {
		setDay(day => ({
			...day,
			thoughts: day.thoughts.filter(thought =>
				thought.id !== targetThought.id
			)
		}))
	}

	function setPreviousDay() {
		setDay(day => getPreviousDay(day.date) || day);
	}

	function setNextDay() {
		setDay(day => getNextDay(day.date) || day);
	}

	return (
		<DayContext.Provider
			value={{
				day,
				setPreviousDay,
				setNextDay,
				today,
				toggleThought,
				createThought,
				deleteThought,
			}}
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
