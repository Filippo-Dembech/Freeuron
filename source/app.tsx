import {DayProvider} from './context/DayContext.js';
import { PageProvider } from './context/PageContext.js';
import Freeuron from './Freeuron.js';
import React from 'react';

export default function App() {
	return (
		<DayProvider>
			<PageProvider>
				<Freeuron />
			</PageProvider>
		</DayProvider>
	);
}
