import type { Quote } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { db } from '~/utils/db.server'

type LoaderData = { quote: Quote }

export const loader: LoaderFunction = async ({ params }) => {
  const quote = await db.quote.findUnique({
    where: { id: params.quoteId },
  })
  if (!quote) throw new Error('Quote not found')
  const data: LoaderData = { quote }
  return json(data)
}

const QuoteRoute = () => {
  const { quote } = useLoaderData<LoaderData>()
  return (
    <div>
      <p>{quote?.content}</p>
      <p>{quote?.author}</p>
    </div>
  )
}

export default QuoteRoute
