import {DayProvider} from './context/DayContext.js';
import Freeuron from './Freeuron.js';
import React from 'react';

export default function App() {
	return (
		<DayProvider>
			<Freeuron />
		</DayProvider>
	);
}
