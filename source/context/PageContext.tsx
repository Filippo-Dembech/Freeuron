import React, { createContext, ReactNode, useContext, useState } from "react"

interface PageContextValue {
    activePage: string;
    setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const PageContext = createContext<PageContextValue | undefined>(undefined);

function PageProvider({children}: {children: ReactNode}) {
    
    const [activePage, setActivePage] = useState("dashboard"); 

    return (
        <PageContext.Provider value={{ activePage, setActivePage }}>
            {children}
        </PageContext.Provider>
    )
}

function usePage() {
    const result = useContext(PageContext);
    if (!result) throw new Error("Can't use 'usePage()' outside PageContext.")
    return result;
}

export { PageProvider, usePage }