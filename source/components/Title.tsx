import BigText from "ink-big-text";
import React from "react";

interface TitleProps {
    children: string;
}

export default function Title({ children }: TitleProps) {
    return <BigText text={children} font='tiny' colors={["blue"]}/>
}