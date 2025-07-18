import NoCategoryFoundError from './ui/NoCategoryFoundError.js';
import React, { useEffect, useState } from 'react';
import Heading from './ui/Heading.js';
import Focusable, { ActionType } from './components/Focusable.js';
import {Focus} from './Focus.js';
import {Box, useFocus} from 'ink';
// import { getConfig } from './getConfig.js';			// FOR DEBUG PURPOSES
import {getConfig} from './config.js';
import {EventEmitter} from 'events';
import Dashboard from './pages/Dashboard/Dashboard.js';
import PageSwitcher from './ui/PageSwitcher.js';
import OverviewPage from './pages/OverviewPage.js';
import HelpPage from './pages/HelpPage.js';
import { usePage } from './context/PageContext.js';
import HelpHint from './ui/presentation/HelpHint.js';


// NOTE: Increase max listeners per EventEmitter
// WHY?  Because <Focusable> and other components use useInput(), which adds input listeners.
//       The default limit is 10, and we go beyond that in complex UIs.
// TODO: Ideally, reduce number of listeners per emitter to stay within the default limit (10)
EventEmitter.defaultMaxListeners = 30;

export default function Freeuron() {
	const config = getConfig();
	const hasCategories = config.categories.length !== 0;
	const {activePage, setActivePage} = usePage()
	const [focusEntity, setFocusEntity] = useState<Focus>();
	
	const {focus} = useFocus();
	
	const getCtrlNavigation = (inputKey: string, page: string, focusElement: Focus): ActionType => {
		return {
			on: (input, key) => key.ctrl && input === inputKey,
			do: () => {
				setActivePage(page)
				setFocusEntity(focusElement);
			}
		}
	}
	
	useEffect(() => {
		setFocusEntity(undefined)
	}, [activePage])
	
	useEffect(() => {
		if (focusEntity) focus(focusEntity);
	}, [focusEntity, activePage])

	if (!hasCategories) return <NoCategoryFoundError />;

	return (
		<Focusable
			alwaysListening
			id="app"
			actions={[
				getCtrlNavigation('q', "helpPage", Focus.pageSwitcher),
				getCtrlNavigation('e', 'dashboard', Focus.textField),
				getCtrlNavigation("s", "dashboard", Focus.searchDayField),
				getCtrlNavigation("o", "dashboard", Focus.categorySelect),
				getCtrlNavigation("n", "dashboard", Focus.categoryTabs),
				getCtrlNavigation("d", "dashboard", Focus.dayScroller),
				getCtrlNavigation("a", "overviewPage", Focus.thoughts),
				getCtrlNavigation("p", "overviewPage", Focus.filterTabs),
				getCtrlNavigation("t", "dashboard", Focus.thoughts),
			]}
			nextFocus={[
				{
					to: Focus.pageSwitcher,
					when: (input, key) => key.ctrl && input === "f"
				}
			]}
			renderComponent={() => (
				<>
					<Box justifyContent="space-between" alignItems='center'>
						<Box alignItems="center"  gap={4}>
							<Heading />
							<PageSwitcher />
						</Box>
						<HelpHint />
					</Box>
					{activePage === 'dashboard' ? (
						<Dashboard />
					) : activePage === 'helpPage' ? (
						<HelpPage />
					) : (
						<OverviewPage />
					)}
				</>
			)}
		/>
	);
}
