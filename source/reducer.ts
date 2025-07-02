import {Category, Thought} from './types.js';

export type State = {
	category: Category | undefined;
	content: string;
	thoughts: Thought[];
	focusedElement: 'category' | 'content';
	error: string;
};

export type Action =
	| {type: 'addThough'}
	| {type: 'switchFocus'}
	| {type: 'setError'; payload: string}
	| {type: 'syncContent'; payload: string}
	| {type: 'syncCategory'; payload: Category}
	| {type: 'selectCategory'; payload: Category}
	| {type: "deleteContentWord" }

export function reducer(state: State, action: Action): State {
	if (action.type === 'addThough')
		return state.content
			? {
					...state,
					thoughts: [
						...state.thoughts,
						{category: state.category, content: state.content},
					],
					content: '',
			  }
			: {
					...state,
					error: "Content can't be empty.",
			  };
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
	if (action.type === 'switchFocus')
		return {
			...state,
			focusedElement:
				state.focusedElement === 'category' ? 'content' : 'category',
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
			focusedElement:
				state.focusedElement === 'category' ? 'content' : 'category',
		};
		
	if (action.type === "deleteContentWord")
		return {
			...state,
			content: state.content.trim().split(" ").slice(0, -1).join(" ")
		}
			
	return state;
}