/*
 * Return Client-Side cookie by name
 */
export function getClientCookie(name: string): string | undefined {
    if (typeof document === 'undefined') return undefined;

    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return undefined;
}
