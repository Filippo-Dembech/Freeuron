import {getConfig} from './getConfig.js';
import NoCategoryFoundError from './ui/NoCategoryFoundError.js';
import React from 'react';
import InputForm from './ui/InputForm.js';
import Title from './components/Title.js';

export default function App() {
	const config = getConfig();

	if (config.categories.length === 0) return <NoCategoryFoundError />;

	return (
		<>
			<Title>Freeuron</Title>
			<InputForm
				onSubmit={(category, content) => console.log(category, content)}
			/>
		</>
	);
}
