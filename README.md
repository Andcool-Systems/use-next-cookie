# useNextCookie 🍪

A lightweight and convenient hook for working with cookies in Next.js — a unified API for both server and client environments, where values are initially set based on server-side data.

## ⚡️ Why is this needed?

Using server-side cookies helps prevent brief flashes of incorrect UI states. For example, without this hook, a user might first see a login form and only then see the authenticated interface after a state update. With `useNextCookie`, the user immediately sees the correct UI corresponding to their authentication status.

## 🚀 Installation

```sh
npm i use-next-cookie
```

## 🔴 Important: Using `CookieProvider`

To ensure `useNextCookie` works correctly, you need to add `CookieProvider` to the root component (usually `RootLayout`).

```tsx
import { CookieProvider } from 'use-next-cookie';

export default function RootLayout({
    children
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <CookieProvider>
            {children}
        </CookieProvider>
    );
}
```

> ⚠️ **Important:** Placing `CookieProvider` inside `RootLayout` enables SSR for all pages.

## ❓ How does it work?

The `useNextCookie` hook allows retrieving server-side cookies on the client without additional requests. On the initial render, cookies are taken from the server and later updated from the client if they change.

Example usage:

```tsx
import { useNextCookie } from 'use-next-cookie';
import { useState, useEffect } from 'react';

export default function Component() {
    const session = useNextCookie('session'); // Get actual cookie value
    const [loggedIn, setLoggedIn] = useState<boolean>(!!session);

    useEffect(() => {
        setLoggedIn(!!session);
    }, [session]);

    return <>{loggedIn ? <User /> : <Unauthorized />}</>;
}
```

## ⏳ Watching cookies

If you need to track cookie changes in the client environment, pass an interval (in milliseconds) as the second argument to the hook:

```tsx
const session = useNextCookie('session', 5000); // Check cookies every 5 seconds
```

When the cookie changes, the hook triggers `useEffect`, causing data updates and a component re-render.

## 🔍 Retrieving server-side cookies without updates

If you only need **server-side** cookies (without client updates), use `useCookiesServer`:

```tsx
import { useCookiesServer } from 'use-next-cookie';

export default function Component() {
    const cookies = useCookiesServer();
    const theme = cookies.get('theme');  // Retrieve the `theme` cookie

    return <ThemeSelector theme={theme} />;
}
```

In this case, cookies will not update after hydration and will remain as they were sent by the server.

---

by AndcoolSystems, 27 February 2025

