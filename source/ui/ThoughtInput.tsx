import React from "react";
import Container from "../components/Container.js";
import TextField from "../components/TextField.js";
import { useThought } from "../context/ThoughtContext.js";

type ThoughtInputProps = {
    isFocused?: boolean;
    onSubmit: (value: string) => void;
}

export default function ThoughtInput({ isFocused = false, onSubmit }: ThoughtInputProps) {
    
    const {content, setContent, category, setError} = useThought();

	return (
		<Container isFocused={isFocused} padding={1} flexGrow={1}>
			<TextField
				placeholder={category?.placeholder || ''}
				value={content}
				onChange={setContent}
				onSubmit={(content) => {
                    if (!content) setError("Text field content can't be empty.");
                    else onSubmit(content);
                }}
				focus={isFocused}
			/>
		</Container>
	);
}
