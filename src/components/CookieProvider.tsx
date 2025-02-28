'use server';

import { cookies } from 'next/headers';
import { CookiesContextProvider } from './CookiesContextProvider';

export const CookieProvider = async ({
    children
}: {
    children: React.ReactNode;
}) => {
    const _cookies = await cookies();

    return (
        <CookiesContextProvider value={_cookies.getAll()}>
            {children}
        </CookiesContextProvider>
    );
};
