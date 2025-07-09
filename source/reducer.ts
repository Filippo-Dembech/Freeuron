import {Category} from './types.js';

export type State = {
	category: Category | undefined;
	content: string;
	error: string;
};

export type Action =
	| {type: 'setError'; payload: string}
	| {type: 'syncContent'; payload: string}
	| {type: 'syncCategory'; payload: Category}
	| {type: 'selectCategory'; payload: Category}
	| {type: 'deleteContentWord'};

export function reducer(state: State, action: Action): State {
	if (action.type === 'syncContent')
		return {
			...state,
			error: '',
			content: action.payload,
		};
	if (action.type === 'setError')
		return {
			...state,
			error: action.payload,
		};
	if (action.type === 'syncCategory')
		return {
			...state,
			category: {
				name: action.payload.name,
				placeholder: action.payload.placeholder,
			},
		};

	if (action.type === 'selectCategory')
		return {
			...state,
			category: {
				name: action.payload.name,
				placeholder: action.payload.placeholder,
			},
		};

	if (action.type === 'deleteContentWord')
		return {
			...state,
			content: state.content.trim().split(' ').slice(0, -1).join(' '),
		};

	return state;
}
