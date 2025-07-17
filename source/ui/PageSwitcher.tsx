import React from 'react';
import Focusable from '../components/Focusable.js';
import {Focus} from '../Focus.js';
import {Tab, Tabs} from 'ink-tab';
import {usePage} from '../context/PageContext.js';

export default function PageSwitcher() {
	const {setActivePage} = usePage();
	return (
		<Focusable
			id={Focus.uiFilters}
			renderComponent={({isFocused}) => (
				<Tabs
					colors={{
						activeTab: {color: 'black', backgroundColor: 'blue'},
					}}
					isFocused={isFocused}
					keyMap={{
						useNumbers: true,
						previous: ['h', 'j'],
						next: ['k', 'l'],
					}}
					onChange={setActivePage}
				>
					<Tab name="dashboard">Dashboard</Tab>
					<Tab name="overview">Overview</Tab>
					<Tab name="helpPage">Help</Tab>
				</Tabs>
			)}
		/>
	);
}
