import { Outlet } from '@remix-run/react'

const QuotesRoute = () => (
  <div>
    <h1>Quotes</h1>
    <main>
      <Outlet />
    </main>
  </div>
)

export default QuotesRoute
