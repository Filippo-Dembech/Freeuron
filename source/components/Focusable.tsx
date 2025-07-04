import {Key, useFocus, useInput} from 'ink';
import React from 'react';

/**
 * Props passed to the `onInput` handler.
 */
export type OnInputArgs = {
	/** Raw character input */
	input: string;

	/** Key metadata from Ink (e.g. `key.return`, `key.tab`, etc.) */
	key: Key;

	/** Function to programmatically change focus by ID */
	focus: (id: string) => void;
};

/**
 * Props passed to the `renderComponent` function.
 */
export type RenderComponentArgs = {
	/** Whether this component is currently focused */
	isFocused: boolean;

	/** Function to programmatically change focus by ID */
	focus: (id: string) => void;
};

type NextFocus = {
    to: string;
    when: (input: string, key: Key) => boolean;
}


type ActionType = {
    on: (input: string, key: Key) => boolean;
    do: (focus: (id: string) => void) => void;
}

/**
 * Handlers and render function for the focusable component.
 */
export type FocusableProps = {
	/**
	 * Render function that returns the component’s output.
	 * Receives `isFocused` and `focus` to control behavior.
	 */
	renderComponent: (args: RenderComponentArgs) => React.ReactNode;
    actions?: ActionType[];
    nextFocus?: NextFocus[];
    alwaysListening?: boolean;
};

/**
 * Options for controlling focus behavior.
 */
export type FocusOptionsType = {
	/**
	 * Unique identifier used to manage focus for this component.
	 */
	id: string;

	/**
	 * If true, this component will automatically be focused on mount.
	 * @default false
	 */
	autoFocus?: boolean;

	/**
	 * If false, the component won't be focusable at all.
	 * @default true
	 */
	isActive?: boolean;
};

/**
 * A reusable Ink component that handles focus and keyboard input.
 * Lets you define how it renders when focused, and how it behaves on key input, Enter, and Tab.
 *
 * ```tsx
 * <Focusable
 *   id="my-input"
 *   autoFocus
 *   renderComponent={({ isFocused }) => (
 *     <Text color={isFocused ? 'green' : 'white'}>Focusable Item</Text>
 *   )}
 *   onInput={({ input }) => console.log(input)}
 *   onEnter={() => console.log("Enter pressed")}
 * />
 * ```
 *
 * @param props - Combination of focusable behavior and rendering logic.
 * @returns The rendered focusable React node.
 */
export default function Focusable({
	id,
	renderComponent,
    alwaysListening = false,
    actions,
    nextFocus,
	autoFocus = false,
	isActive = true,
}: FocusableProps & FocusOptionsType): React.ReactNode {
        	const {focus, isFocused} = useFocus({id, autoFocus, isActive});

	useInput((input, key) => {
		if (!isFocused && !alwaysListening) return;

        const action = actions?.find(action => action.on(input, key))
        if (action) action.do(focus);

		// Handle Next Focus
		const next = nextFocus?.find(({when}) => when(input, key));
		if (next) {
            focus(next.to);
        }

	});

	return renderComponent({isFocused, focus});
}
