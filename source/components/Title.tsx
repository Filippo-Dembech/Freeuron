import BigText from 'ink-big-text';
import React from 'react';

interface TitleProps {
	children: string;
	color?: string;
}

export default function Title({children, color = 'white'}: TitleProps) {
	return <BigText text={children} font="tiny" colors={[color]} />;
}
