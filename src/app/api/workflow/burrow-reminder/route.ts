import { db } from '@/database/drizzle'
import { booksTable, usersTable } from '@/database/schema'
import BurrowSuccess from '@/src/emails/BurrowSuccess'
import config from '@/src/lib/config'
import { serve } from '@upstash/workflow/nextjs'
import { eq } from 'drizzle-orm'
import { Resend } from 'resend'

const resend = new Resend(config.env.resendToken)

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

  await context.run('send email', async () => {
    await resend.emails.send({
      from: 'Antonio F Nelson <contact@antonionelson.tech>',
      to: [user[0].email],
      subject: `${book[0].title} Reminder - Return Date: ${dueDate}`,
      react: BurrowSuccess({ book: book[0], name: user[0].fullName }),
    })
  })

  const reminderDate = new Date(dueDate)
  reminderDate.setDate(reminderDate.getDate() - 1)

  await context.sleep(
    'await-reminder-date',
    (reminderDate.getTime() - Date.now()) / 1000
  )

  await context.api.resend.call('send email', {
    token: config.env.resendToken,
    body: {
      from: 'Antonio F Nelson <contact@antonionelson.tech>',
      to: [user[0].email],
      subject: `${book[0].title} Reminder - Return Date: ${dueDate}`,
      html: `<p>The book ${book[0].title} is due on ${dueDate}. Please return it on time.</p>`,
    },
  })

  await context.sleep('await-return-date', 24 * 60 * 60)

  await context.run('send-reminder-email', async () => {
    await resend.emails.send({
      from: 'Antonio F Nelson <contact@antonionelson.tech>',
      to: [user[0].email],
      subject: `${book[0].title} Reminder - Return Date: ${dueDate}`,
      react: BurrowSuccess({ book: book[0], name: user[0].fullName }),
    })
  })
})
