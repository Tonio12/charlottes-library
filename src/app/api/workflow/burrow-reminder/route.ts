import { db } from '@/database/drizzle'
import { booksTable, usersTable } from '@/database/schema'
import { sendEmail } from '@/src/lib/workflow'
import { serve } from '@upstash/workflow/nextjs'
import { eq } from 'drizzle-orm'

type InitialData = {
  userId: string
  bookId: string
  dueDate: string
}

export const { POST } = serve<InitialData>(async (context) => {
  const { userId, bookId, dueDate } = context.requestPayload

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .limit(1)
  const book = await db
    .select()
    .from(booksTable)
    .where(eq(booksTable.id, bookId))
    .limit(1)

  await context.run('send-email', async () => {
    await sendEmail({
      email: user[0].email,
      subject: `${book[0].title} burrowed Successfully`,
      message: `You have successfully borrowed ${book[0].title} from the library. Please return it on ${dueDate}`,
    })
  })
})
