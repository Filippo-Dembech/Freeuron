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
  
  if (year) return `${day}/${month}/${year}`
  if (month.length === 2) return `${day}/${month}/`
  if (month.length === 1) return `${day}/${month}`
  if (day.length === 2) return `${day}/`

  return `${day}`;
}

type SearchFieldProps = {
	onSubmit: (date: string) => void;
}


export default function SearchField({ onSubmit }: SearchFieldProps) {
	const [daySearch, setDaySearch] = useState('');
	const formattedDate = formatDateString(daySearch)
	
	console.log("daySearch = ", daySearch);
	console.log("formattedDate = ", formattedDate);

	function isOnlyDigits(input: string): boolean {
		return /^[0-9]+$/.test(input);
	}

	return (
		<Focusable
			id={Focus.searchDayField}
			renderComponent={({isFocused}) => (
				<Container isFocused={isFocused}>
					<Text>Search: </Text>
					<Box display={daySearch ? "none" : "flex"}>
						<TextField
							placeholder="dd/mm/yyyy"
							value={daySearch}
							onChange={value => {
								if ((value && !isOnlyDigits(value)) || value.length > 8) return;
								setDaySearch(value);
							}}
							onSubmit={() => onSubmit(formattedDate)}
							focus={isFocused}
						/>
					</Box>
					<Box display={daySearch ? "flex" : "none"}>
						<Text>{formattedDate}</Text>
					</Box>
				</Container>
			)}
		/>
	);
}
