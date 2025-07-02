export interface Category {
	name: string,
	placeholder: string,
}

export type Option = {
	label: string;
	value: string;
};

export type Thought = {
	category?: Category;	// undefined because categories are loaded asyncronously from 'config' file
	content: string;
};

export type DayType = {
	date: string;
	thoughts: Thought[];
}