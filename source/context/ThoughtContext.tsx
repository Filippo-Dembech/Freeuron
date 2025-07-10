import {createContext, useContext, useEffect, useState} from 'react';
import React from 'react';
import { Category } from '../types.js';
import { getConfig } from '../getConfig.js';

type ThoughtContextValue = {
	content: string;
	category?: Category;
    error: string;
    categories: Category[];
	setContent: React.Dispatch<React.SetStateAction<string>>;
	setCategory: React.Dispatch<React.SetStateAction<Category>>;
    setError: React.Dispatch<React.SetStateAction<string>>;
};

const ThoughtContext = createContext<ThoughtContextValue | undefined>(
	undefined,
);

function ThoughtProvider({children}: {children: React.ReactNode}) {
	const config = getConfig();
    const {categories} = config;
	const [content, setContent] = useState('');
	const [category, setCategory] = useState<Category | undefined>(categories[0]);
    const [error, setError] = useState("");
    const resetError = () => setError("");
    
    useEffect(() => {
        resetError();
    }, [content])

	return (
		<ThoughtContext.Provider
			value={{content, setContent, category, setCategory, categories, error, setError}}
		>
			{children}
		</ThoughtContext.Provider>
	);
}

function useThought() {
    const result = useContext(ThoughtContext);
    if (!result) throw new Error("'useThought()' can't be used outside ThoughtContext.");
    return result;
}

export { ThoughtProvider, useThought};