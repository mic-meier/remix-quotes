import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'

import { db } from '~/utils/db.server'

type LoaderData = { quotesListItems: Array<{ id: string; author: string }> }

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    quotesListItems: await db.quote.findMany({
      take: 5,
      select: { id: true, author: true },
      orderBy: { createdAt: 'desc' },
    }),
  }
  return json(data)
}

const QuotesRoute = () => {
  const data = useLoaderData<LoaderData>()
  return (
    <div className="flex flex-col">
      <header className="py-4 border-b border-b-red-800">
        <div className="flex justify-between items-center mx-auto w-[1024px]">
          <h1 className="text-pink-600">
            <Link to="/" title="Quottes">
              Quotes
            </Link>
          </h1>
        </div>
      </header>
      <main className="py-8 flex-[1_1_100%]">
        <div className="flex justify-between items-center mx-auto w-[1024px]">
          <div className="max-w-xs">
            <Link to=".">Get a random quote</Link>
            <ul>
              {data.quotesListItems.map((quote) => (
                <li key={quote.id}>
                  <Link to={quote.id}>{quote.author}</Link>
                </li>
              ))}
            </ul>
            <Link
              to="new"
              className="inline-flex items-center justify-center font-bold px-4 py-2 border-0 rounded bg-teal-500"
            >
              Add your own
            </Link>
          </div>
          <div className="grow text-center">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}

export default QuotesRoute
