import {DayProvider} from './context/DayContext.js';
import Freeuron from './Freeuron.js';

// import {Text} from 'ink';
//import Focusable from './components/Focusable.js';
import React from 'react';

export default function App() {
	/*
	return (
		<>
			<Focusable
				id="first"
				actions={[
					{
						on: (input, key) => key.ctrl && input == "s",
						do: (focus) => focus("second")
					}
				]}
				renderComponent={({isFocused}) => (
					<Text color={isFocused ? 'green' : 'white'}>FIRST</Text>
				)}
			/>
			<Focusable
				id="second"
				renderComponent={({isFocused}) => (
					<Text color={isFocused ? 'green' : 'white'}>SECOND</Text>
				)}
			/>
			<Focusable
				id="third"
				renderComponent={({isFocused}) => (
					<Text color={isFocused ? 'green' : 'white'}>THIRD</Text>
				)}
			/>
		</>
	);
	*/
	return (
		<DayProvider>
			<Freeuron />
		</DayProvider>
	);
}
