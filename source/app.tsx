import React from 'react';
import {DayProvider} from './context/DayContext.js';
import { PageProvider } from './context/PageContext.js';
import Freeuron from './Freeuron.js';

export default function App() {
	return (
		<DayProvider>
			<PageProvider>
				<Freeuron />
			</PageProvider>
		</DayProvider>
	);
}
