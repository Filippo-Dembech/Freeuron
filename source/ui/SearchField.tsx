import React, {useState} from 'react';
import TextField from '../components/TextField.js';
import Focusable from '../components/Focusable.js';
import {Focus} from '../Focus.js';
import Container from '../components/Container.js';
import {Box, Text} from 'ink';

function formatDateString(digits: string): string {
	const day = digits.slice(0, 2);
	const month = digits.slice(2, 4);
	const year = digits.slice(4, 8);

	if (year) return `${day}/${month}/${year}`;
	if (month.length === 2) return `${day}/${month}/`;
	if (month.length === 1) return `${day}/${month}`;
	if (day.length === 2) return `${day}/`;

	return `${day}`;
}

function isOnlyDigits(input: string): boolean {
	return /^[0-9]+$/.test(input);
}

function Caret() {
	return <Text bold>&#9602;</Text>;
}

type SearchFieldProps = {
	onSubmit: (date: string) => void;
};

export default function SearchField({onSubmit}: SearchFieldProps) {
	const [dayQuery, setDayQuery] = useState('');
	const [error, setError] = useState('');

	const formattedDate = formatDateString(dayQuery);
	const hasCompleteDayQuery = dayQuery.length >= 8;
	const errorMessage =
		dayQuery === ''
			? 'Error. Please insert a date'
			: `'${formattedDate}' is invalid date format. Please insert complete date (e.g. 25/12/2003).`;

	const resetError = () => setError('');
	const resetDayQuery = () => setDayQuery('');

	return (
		<Focusable
			id={Focus.searchDayField}
			renderComponent={({isFocused}) => (
				<>
					<Container
						isFocused={isFocused}
						paddingX={1}
						justifyContent="space-between"
					>
						<Box>
							<Text>Search: </Text>
							<Box width={0} height={0} overflow="hidden">
								<TextField
									focus={isFocused}
									value={dayQuery}
									flushWhenSubmit={false}
									onChange={value => {
										resetError();
										if (value.length > 8) return;
										if (value && !isOnlyDigits(value)) return;
										setDayQuery(value);
									}}
									onSubmit={() => {
										if (!hasCompleteDayQuery) setError(errorMessage);
										else {
											onSubmit(formattedDate);
											resetError();
											resetDayQuery(); // do it manually because of <TextField> 'flushWhenSubmit={false}' prop
										}
									}}
								/>
							</Box>

							<Box>
								<Text color={dayQuery ? 'white' : 'gray'}>
									{dayQuery ? formattedDate : 'dd/mm/yyyy'}
									{dayQuery && <Caret />}
								</Text>
							</Box>
						</Box>
						{error && <Text color="red">{error}</Text>}
					</Container>
				</>
			)}
		/>
	);
}
