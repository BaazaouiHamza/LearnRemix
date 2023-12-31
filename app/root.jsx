import styles from './styles/main.css'

import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";

import MainNavigation from './components/MainNavigation'

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    return (<html lang="en">
      <head>
        <Meta />
        <Links />
        <title>An error occured!</title>
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <main className='error'>
          <h1>{error.statusText}</h1>
          <p>{error.data?.message || 'Something went wrong!'}</p>
          <p>Back to <Link to="/">Safety!</Link></p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>)
  }
  else if (error instanceof Error) {
    return (
      <html lang="en">
        <head>
          <Meta />
          <Links />
          <title>An error occured!</title>
        </head>
        <body>
          <header>
            <MainNavigation />
          </header>
          <main className='error'>
            <h1>
              An error occured!
            </h1>
            <p>{error?.message}</p>
            <p>Back to <Link to="/">Safety!</Link></p>
          </main>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    )
  }
  else {
    return (
      <html lang="en">
        <head>
          <Meta />
          <Links />
          <title>An error occured!</title>
        </head>
        <body>
          <header>
            <MainNavigation />
          </header>
          <main className='error'>
            <h1>
              An Unknown error occured!
            </h1>
            <p>Back to <Link to="/">Safety!</Link></p>
          </main>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    )
  }
}

