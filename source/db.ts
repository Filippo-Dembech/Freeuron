import {JSONFilePreset} from 'lowdb/node';
import {Category, DayType, Thought} from './types.js';
import {Low} from 'lowdb';
import {dateToString, sameDate} from './utils/date.js';

type Data = {
	days: DayType[];
};

const defaultData: Data = {
	days: [],
};

const db: Low<Data> = await JSONFilePreset<Data>('db.json', defaultData);

// =============================== UTILS ===============================

const noDays = () => db.data.days.length === 0;
const onlyOneDay = () => db.data.days.length === 1;
const onlyDay = () => db.data.days[0];
const previousDayOf = (i: number) => db.data.days[i - 1];
const nextDayOf = (i: number) => db.data.days[i + 1];

// =====================================================================

export function createToday(): DayType {
	const today: DayType = {date: dateToString(new Date()), thoughts: []};
	const existingToday = db.data.days.find(day =>
		sameDate(day.date, today.date),
	);
	if (existingToday) return existingToday;
	db.data.days.push(today);
	db.write();
	return today;
}

export function getAllThoughts(): Thought[] {
	const allThoughts = db.data.days.flatMap(day => day.thoughts);
	return allThoughts;
}

export function getThoughtsByDay(date: string) {
	return getDay(date)?.thoughts;
}

export function getThoughtsByCategory(category: Category) {
	return db.data.days
		.flatMap(day => day.thoughts)
		.filter(thought => thought.category?.name === category.name);
}

export function createDBThought(date: string, thought: Thought) {
	db.data.days = db.data.days.map(day => {
		if (day.date === date) {
			return {
				...day,
				thoughts: [...day.thoughts, thought],
			};
		}
		return day;
	});
	db.write();
}

export function getDay(targetDate: string): DayType | undefined {
	if (noDays()) return;

	return db.data.days.find(day => sameDate(day.date, targetDate));
}

export function getPreviousDay(targetDate: string): DayType | undefined {
	if (noDays()) return;

	for (let i = 0; i < db.data.days.length; i++) {
		let day = db.data.days[i]!; // must have at least one day because of initial guarde clause
		if (sameDate(day.date, targetDate) && onlyOneDay()) return onlyDay();
		if (sameDate(day.date, targetDate)) return previousDayOf(i);
	}
	return;
}

export function getNextDay(targetDate: string): DayType | undefined {
	if (noDays()) return;

	for (let i = 0; i < db.data.days.length - 1; i++) {
		let day = db.data.days[i]!; // must have at least one day because of initial guarde clause
		if (sameDate(day.date, targetDate) && onlyOneDay()) return onlyDay();
		if (sameDate(day.date, targetDate)) return nextDayOf(i);
	}
	return;
}

export function deleteThought(targetDate: string, thoughtToDelete?: Thought) {
	if (!thoughtToDelete) return;
	db.data.days.forEach(day => {
		if (day.date === targetDate) {
			day.thoughts = day.thoughts.filter(
				thought => thought?.id !== thoughtToDelete.id,
			);
		}
	});
	db.write();
}

export function syncDBThoughts(targetDay: DayType, thoughts: Thought[]) {
	db.data.days.forEach(day => {
		if (day.date === targetDay.date) {
			day.thoughts = thoughts;
		}
	});
	db.write();
}


export function toggleThought(thoughtToToggle: Thought) {
	if (!thoughtToToggle) return;

	for (const day of db.data.days) {
		const thought = day.thoughts.find(t => t.id === thoughtToToggle.id);
		if (thought) {
			thought.checked = !thought.checked;
			db.write();
			return;
		}
	}
}


export default db;
