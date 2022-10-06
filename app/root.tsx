import { LiveReload } from '@remix-run/react'

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Quotinator</title>
      </head>
      <body>
        Ahoi World
        <LiveReload />
      </body>
    </html>
  )
}
