import NoCategoryFoundError from './ui/NoCategoryFoundError.js';
import React, {useState} from 'react';
import Heading from './ui/Heading.js';
import Focusable from './components/Focusable.js';
import {Focus} from './Focus.js';
import {Box} from 'ink';
// import { getConfig } from './getConfig.js';			// FOR DEBUG PURPOSES
import {getConfig} from './config.js';
import {EventEmitter} from 'events';
import Dashboard from './pages/Dashboard.js';
import PageSwitcher from './ui/PageSwitcher.js';
import BrowsePage from './pages/BrowsePage.js';

// NOTE: Increase max listeners per EventEmitter
// WHY?  Because <Focusable> and other components use useInput(), which adds input listeners.
//       The default limit is 10, and we go beyond that in complex UIs.
// TODO: Ideally, reduce number of listeners per emitter to stay within the default limit (10)
EventEmitter.defaultMaxListeners = 30;

export default function Freeuron() {
	const config = getConfig();
	const hasCategories = config.categories.length !== 0;
	const [activePage, setActivePage] = useState('dashboard');

	if (!hasCategories) return <NoCategoryFoundError />;

	return (
		<Focusable
			alwaysListening
			id="app"
			nextFocus={[
				{to: Focus.textField, when: (input, key) => key.ctrl && input === 'e'},
				{
					to: activePage === "dashboard" ? Focus.categorySelect : Focus.filterTabs,
					when: (input, key) =>
						(key.ctrl && input === 'o') || (key.meta && input === '1'),
				},
				{
					to: Focus.dayScroller,
					when: (input, key) => key.ctrl && input === 'd',
				},
				{
					to: Focus.categoryTabs,
					when: (input, key) => key.ctrl && input === 't',
				},
				{
					to: Focus.searchDayField,
					when: (input, key) => key.ctrl && input === 's',
				},
				{
					to: Focus.uiFilters,
					when: (input, key) => key.ctrl && input === 'f',
				},
			]}
			renderComponent={() => (
				<>
					<Box alignItems="center" gap={4}>
						<Heading />
						<PageSwitcher setPage={setActivePage} />
					</Box>
					{activePage === 'dashboard' ? <Dashboard /> : <BrowsePage />}
				</>
			)}
		/>
	);
}
