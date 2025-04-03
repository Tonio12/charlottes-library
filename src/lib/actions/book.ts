'use server'

import { db } from '@/database/drizzle'
import { booksTable, burrowRecords } from '@/database/schema'
import { eq } from 'drizzle-orm'
import dayjs from 'dayjs'
import { getWorkflowClient } from '../workflow'
import config from '../config'

export const burrowBook = async (params: BurrowBookParams) => {
  const { userId, bookId } = params

  try {
    const book = await db
      .select({ availableCopies: booksTable.availableCopies })
      .from(booksTable)
      .where(eq(booksTable.id, bookId))
      .limit(1)

    if (!book.length || book[0].availableCopies <= 0) {
      return {
        success: false,
        error: 'Book not available',
      }
    }

    const dueDate = dayjs().add(7, 'days').toDate().toISOString()

    const record = await db.insert(burrowRecords).values({
      userId,
      bookId,
      dueDate,
      status: 'BURROWED',
    })

    await db
      .update(booksTable)
      .set({
        availableCopies: book[0].availableCopies - 1,
      })
      .where(eq(booksTable.id, bookId))

    const workflowClient = getWorkflowClient()
    await workflowClient.trigger({
      url: `${config.env.prodApiUrl}/api/workflow/burrow-reminder`,
      body: {
        userId,
        bookId,
        dueDate,
      },
      headers: {
        'x-vercel-protection-bypass': config.env.vercelAutomationBypassSecret,
      },
    })

    return {
      success: true,
      data: JSON.parse(JSON.stringify(record)),
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      error: 'Failed to borrow book',
    }
  }
}
