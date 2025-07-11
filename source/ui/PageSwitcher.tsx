import React from 'react';
import Focusable from '../components/Focusable.js';
import {Focus} from '../Focus.js';
import {Tab, Tabs} from 'ink-tab';

type PageSwitcherProps = {
	setPage: React.Dispatch<React.SetStateAction<string>>;
};

export default function PageSwitcher({setPage}: PageSwitcherProps) {
	return (
		<Focusable
			id={Focus.uiFilters}
			renderComponent={({isFocused}) => (
				<Tabs
					colors={{
						activeTab: {color: 'black', backgroundColor: 'blue'},
					}}
					isFocused={isFocused}
					flexDirection="column"
					keyMap={{
						useNumbers: true,
						previous: ['h', 'j'],
						next: ['k', 'l'],
					}}
					onChange={setPage}
				>
					<Tab name="dashboard">Dashboard</Tab>
					<Tab name="all">All</Tab>
				</Tabs>
			)}
		/>
	);
}
