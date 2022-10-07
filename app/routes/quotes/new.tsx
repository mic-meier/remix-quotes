import type { ActionFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { useActionData } from '@remix-run/react'

import { db } from '~/utils/db.server'

const validateQuoteContent = (content: string) => {
  if (content.length < 10) {
    return `That quote is too short`
  }
}

const validateQuoteAuthor = (content: string) => {
  if (content.length < 3) {
    return `That quote's author name is too short`
  }
}

type ActionData = {
  formError?: string
  fieldErrors?: {
    content: string | undefined
    author: string | undefined
  }
  fields?: {
    content: string
    author: string
  }
}

const badRequest = (data: ActionData) => json(data, { status: 400 })

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const content = form.get('content')
  const author = form.get('author')
  if (typeof content !== 'string' || typeof author !== 'string') {
    return badRequest({
      formError: `Form not submitted correctly.`,
    })
  }

  const fieldErrors = {
    content: validateQuoteContent(content),
    author: validateQuoteAuthor(author),
  }

  const fields = { content, author }

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields })
  }

  const quote = await db.quote.create({ data: fields })
  return redirect(`/quotes/${quote.id}`)
}

const NewQuotesRoute = () => {
  const actionData = useActionData<ActionData>()

  return (
    <div>
      <p>Add a new quote</p>
      <form method="post" className="flex flex-col gap-4 w-full p-8">
        <div>
          <label htmlFor="content">
            Quote{' '}
            <textarea
              defaultValue={actionData?.fields?.content}
              name="content"
              aria-invalid={
                Boolean(actionData?.fieldErrors?.content) || undefined
              }
              aria-errormessage={
                actionData?.fieldErrors?.content ? 'content-error' : undefined
              }
              id="content"
              className="w-full h-9 min-h-[50px] px-3 py-2 m-0 border border-solid rounded bg-slate-200 leading-normal"
            />
          </label>
          {actionData?.fieldErrors?.content ? (
            <p
              className="mt-1 text-red-500 text-sm"
              role="alert"
              id="content-error"
            >
              {actionData.fieldErrors.content}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="author">
            Author{' '}
            <input
              type="text"
              defaultValue={actionData?.fields?.author}
              name="author"
              aria-invalid={
                Boolean(actionData?.fieldErrors?.author) || undefined
              }
              aria-errormessage={
                actionData?.fieldErrors?.author ? 'author-error' : undefined
              }
              id="author"
              className="w-full h-9  px-3 py-2 m-0 border border-solid rounded bg-slate-200 leading-normal"
            />
          </label>
          {actionData?.fieldErrors?.author ? (
            <p
              className="mt-1 text-red-500 text-sm"
              role="alert"
              id="author-error"
            >
              {actionData.fieldErrors.author}
            </p>
          ) : null}
        </div>
        <div>
          {actionData?.formError ? (
            <p className="mt-1 text-red-500 text-sm" role="alert">
              {actionData.formError}
            </p>
          ) : null}
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  )
}

export default NewQuotesRoute
