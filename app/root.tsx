import type { LinksFunction } from '@remix-run/node'
import { Links, LiveReload, Outlet } from '@remix-run/react'
import styles from './styles/app.css'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Quotinator</title>
        <Links />
      </head>
      <body>
        <Outlet />
        <LiveReload />
      </body>
    </html>
  )
}
