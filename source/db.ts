import {JSONFilePreset} from 'lowdb/node';
import {DayType, Thought} from './types.js';
import {Low} from 'lowdb';
import { dateToString, getNextDayDateString, getPreviousDayDateString } from './utils/date.js';
import { areDatesEqual } from './utils/areDateEquals.js';

type Data = {
	days: DayType[];
};

const defaultData: Data = {
	days: [],
};

const db: Low<Data> = await JSONFilePreset<Data>('db.json', defaultData);

export function createToday(): DayType {
	const today: DayType = {date: dateToString(new Date()), thoughts: []};
	const existingToday = db.data.days.find(day => areDatesEqual(day.date, today.date));
	if (existingToday) return existingToday;
	db.data.days.push(today);
	db.write();
	return today;
}

export function createThought(date: string, thought: Thought) {
	db.data.days.map(day =>
		day.date === date ? day.thoughts.push(thought) : day,
	);
	db.write();
}

export function getPreviousDay(date: string): DayType | undefined {
	const previousDay = getPreviousDayDateString(date);
	const result = db.data.days.find(day => day.date === previousDay);
	return result;
}

export function getNextDay(date: string): DayType | undefined {
	const nextDay = getNextDayDateString(date);
	const result = db.data.days.find(day => day.date === nextDay);
	return result;
}

/*
export function deleteThought(thought: Thought) {
	
}
*/

export default db;
