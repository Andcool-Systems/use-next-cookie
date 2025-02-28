'use client';

import { createContext, useContext, ReactNode } from 'react';
import { CookiesContextProps, CookieType } from './types';

const CookiesContext = createContext<CookiesContextProps | null>(null);

export const useCookiesServer = (): CookiesContextProps => {
    const context = useContext(CookiesContext);
    if (!context) {
        throw new Error(
            'useCookiesServer must be used within a CookiesContextProvider'
        );
    }
    return context;
};

interface CookiesProviderProps {
    children: ReactNode;
    value: CookieType[];
}

export const CookiesContextProvider = ({
    children,
    value
}: CookiesProviderProps) => {
    const contextValue: CookiesContextProps = {
        get: name => value.find(cookie => cookie.name === name)?.value,
        getAll: () => [...value],
        has: name => value.some(cookie => cookie.name === name)
    };

    return (
        <CookiesContext.Provider value={contextValue}>
            {children}
        </CookiesContext.Provider>
    );
};
