import React from 'react';
import {DayProvider} from './context/DayContext.js';
import { PageProvider } from './context/PageContext.js';
import Freeuron from './Freeuron.js';

export default function App() {
	return (
		// <>
		// 	<Select
		// 		items={testLists.users}
		// 		labelFrom={user => user.id.toString()}
		// 		renderItem={user => user ? <Text>({user.id}) {user.name}</Text> : <Text>No user</Text>}
		// 		initialItem={user => user.id === 2}
		// 	/>
		// </>
		<DayProvider>
			<PageProvider>
				<Freeuron />
			</PageProvider>
		</DayProvider>
	);
}
