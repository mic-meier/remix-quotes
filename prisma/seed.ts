import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()

async function seed() {
  await Promise.all(
    getQuotes().map((quote) => {
      return db.quote.create({ data: quote })
    })
  )
}

seed()

function getQuotes() {
  return [
    {
      content:
        'The greatest glory in living lies not in never falling, but in rising every time we fall.',
      author: 'Nelson Mandela',
    },
    {
      content: 'The way to get started is to quit talking and begin doing. ',
      author: 'Walt Disney',
    },
    {
      content:
        "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
      author: 'James Cameron',
    },
    {
      content:
        "Don't judge each day by the harvest you reap but by the seeds that you plant.",
      author: 'Robert Louis Stevenson',
    },
    {
      content:
        'Tell me and I forget. Teach me and I remember. Involve me and I learn.',
      author: 'Benjamin Franklin',
    },
    {
      content:
        "In the end, it's not the years in your life that count. It's the life in your years.",
      author: 'Abraham Lincoln',
    },
    {
      content:
        'Never let the fear of striking out keep you from playing the game.',
      author: 'Babe Ruth',
    },
    {
      content:
        "Whether you think you can or you think you can't, you're right.",
      author: 'Henry Ford',
    },
  ]
}
