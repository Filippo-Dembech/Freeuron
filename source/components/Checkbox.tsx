import React, { useEffect, useState } from 'react';
import {Text, useFocus, useInput} from 'ink';

interface CheckboxProps {
	label: string;
	checked?: boolean;
    onCheck?: (checked: boolean) => void;
}

export default function Checkbox({label, checked = false, onCheck}: CheckboxProps) {
    
    const [isChecked, setIsChecked] = useState(checked);
    const {isFocused} = useFocus();
    
    useEffect(() => {
        setIsChecked(checked);
    }, [checked])
    
    useInput((_, key) => {
        if (!isFocused) return;
        if (key.return) onCheck?.(isChecked)
    })

	return (
		<Text bold={isFocused}>
			<Text color="gray">
				{'['}
				<Text color="green">{isChecked ? 'X' : ' '}</Text>
				{']'}
			</Text>{' '}
			<Text strikethrough={isChecked}>{label}</Text>
		</Text>
	);
}
