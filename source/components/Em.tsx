import React, { ReactNode } from "react";
import { Text } from "ink";

export default function Em({children}: {children: ReactNode}) {
    return (
        <Text italic>{children}</Text>
    )
}