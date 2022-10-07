import type { Quote } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { db } from '~/utils/db.server'

type LoaderData = { randomQuote: Quote }

export const loader: LoaderFunction = async ({ params }) => {
  const count = await db.quote.count()
  const randomRowNumber = Math.floor(Math.random() * count)
  const [randomQuote] = await db.quote.findMany({
    take: 1,
    skip: randomRowNumber,
  })
  if (!randomQuote) throw new Error('Quote not found')
  const data: LoaderData = { randomQuote }
  return json(data)
}

const QuotesIndexRoute = () => {
  const { randomQuote } = useLoaderData<LoaderData>()

  return (
    <div>
      <p>{randomQuote.content}</p>
      <p>{randomQuote.author}</p>
    </div>
  )
}

export default QuotesIndexRoute
