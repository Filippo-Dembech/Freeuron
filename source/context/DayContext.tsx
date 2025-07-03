import {createContext, useContext, useState} from 'react';
import {DayType} from '../types.js';
import {createToday, getNextDay, getPreviousDay} from '../db.js';
import React from 'react';

type DayContextValueType = {
	day: DayType;
	today: DayType;
	setPreviousDay: () => void;
	setNextDay: () => void;
};

const DayContext = createContext<DayContextValueType | undefined>(undefined);

function DayProvider({children}: {children: React.ReactNode}) {
	const today = createToday();
	const [day, setDay] = useState<DayType>(today);

	function setPreviousDay() {
		setDay(getPreviousDay(day.date) || today);
	}

	function setNextDay() {
		setDay(getNextDay(day.date) || today);
	}

	return (
		<DayContext.Provider value={{day, setPreviousDay, setNextDay, today}}>
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
