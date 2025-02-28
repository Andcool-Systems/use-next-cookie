'use client';

import { useState, useEffect } from 'react';
import { useCookiesServer } from './CookiesContextProvider';
import { getClientCookie } from './ClientCookie';

export default function useNextCookie(
    name: string,
    watch?: number
): string | undefined {
    const cookies = useCookiesServer(); // Get provided server-side cookies

    const [cookieValue, setCookieValue] = useState<string | undefined>(
        cookies.get(name)
    );

    useEffect(() => {
        setCookieValue(getClientCookie(name)); // Update cookie from client-side after DOM loaded

        const handleCookieChange = () => {
            setCookieValue(getClientCookie(name));
        };

        if (watch && watch > 0) {
            const intervalId = setInterval(handleCookieChange, watch);
            return () => clearInterval(intervalId);
        }

        return () => {};
    }, [name]);

    return cookieValue;
}
