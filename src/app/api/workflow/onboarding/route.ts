import { db } from '@/database/drizzle'
import { usersTable } from '@/database/schema'
import { sendEmail } from '@/src/lib/workflow'
import { serve } from '@upstash/workflow/nextjs'
import { eq } from 'drizzle-orm'

type InitialData = {
  email: string
  fullName: string
}

type UserState = 'non-active' | 'active'

const ONE_DAY_IN_MS = 60 * 60 * 24 * 1000
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS
const ONE_MONTH_IN_MS = 30 * ONE_DAY_IN_MS

const getUserState = async (email: string): Promise<UserState> => {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1)

  if (user.length === 0) return 'non-active'
  const lastActivityDate = new Date(user[0].lastActivityDate)
  const now = new Date()
  const timeDiff = now.getTime() - lastActivityDate.getTime()

  if (timeDiff > THREE_DAYS_IN_MS && timeDiff <= ONE_MONTH_IN_MS) {
    return 'non-active'
  }

  return 'active'
}

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload

  await context.run('new-signup', async () => {
    await sendEmail({
      email,
      subject: 'Welcome to the platform',
      message: `Welcome ${fullName} to the platform`,
    })
  })

  await context.sleep('wait-for-3-days', 60 * 60 * 24 * 3)

  while (true) {
    const state = await context.run('check-user-state', async () => {
      return await getUserState(email)
    })

    if (state === 'non-active') {
      await context.run('send-email-non-active', async () => {
        await sendEmail({
          email,
          subject: 'Are you still with us?',
          message: `Hey ${fullName}, we noticed you haven't been around lately. We're here if you need anything!`,
        })
      })
    } else if (state === 'active') {
      await context.run('send-email-active', async () => {
        await sendEmail({
          email,
          subject: 'Welcome Back!',
          message: `Hey ${fullName}, good to see you again!`,
        })
      })
    }

    await context.sleep('wait-for-1-month', 60 * 60 * 24 * 30)
  }
})
