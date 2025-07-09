import {createContext, useContext, useEffect, useState} from 'react';
import {DayType, Thought} from '../types.js';
import {
	createDBThought,
	createToday,
	getNextDay,
	getPreviousDay,
	syncDBThoughts,
} from '../db.js';
import React from 'react';
import {alphabetically} from '../utils/sort.js';

type DayContextValueType = {
	day: DayType;
	today: DayType;
	setDay: React.Dispatch<React.SetStateAction<DayType>>;
	activeTab: string | undefined;
	setActiveTab: (activeTab: string) => void;
	createThought: (thought: Thought) => void;
	deleteThought: (thought: Thought) => void;
	setPreviousDay: () => void;
	setNextDay: () => void;
	toggleThought: (thought: Thought) => void;
};

const DayContext = createContext<DayContextValueType | undefined>(undefined);

function DayProvider({children}: {children: React.ReactNode}) {
	const today = createToday();
	const [day, setDay] = useState<DayType>(today);
	const usedCategories = [
		...new Set(day.thoughts.map(thought => thought.category?.name)),
	].sort(alphabetically);
	const [activeTab, setActiveTab] = useState(usedCategories[0]);

	useEffect(() => {
		syncDBThoughts(day, day.thoughts);
		if (
			!day.thoughts.map(thought => thought.category?.name).includes(activeTab)
		) {
			setActiveTab(usedCategories[0]);
		}
	}, [day]);

	const createThought = (thought: Thought) => {
		setActiveTab(thought.category?.name);
		setDay(day => ({...day, thoughts: [...day.thoughts, thought]}));
		createDBThought(day.date, thought);
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
			thoughts: day.thoughts.filter(thought => thought.id !== targetThought.id),
		}));
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
				setDay,
				setPreviousDay,
				setActiveTab,
				setNextDay,
				today,
				activeTab,
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
