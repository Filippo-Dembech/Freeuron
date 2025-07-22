import React, { ReactNode } from "react";
import { Text } from "ink";

export default function Code({children}: {children: ReactNode}) {
    return (
        <Text color="blue" bold>{children}</Text>
    )
}