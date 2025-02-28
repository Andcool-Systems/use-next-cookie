/**
 * Default type of cookie
 */
export type CookieType = { name: string; value: string };

export type CookiesContextProps = {
    get: (name: string) => string | undefined;
    getAll: () => CookieType[];
    has: (name: string) => boolean;
};
