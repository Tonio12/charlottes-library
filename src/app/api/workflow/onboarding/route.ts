import { db } from '@/database/drizzle'
import { usersTable } from '@/database/schema'
import WelcomeEmail from '@/src/emails/Welcome'
import config from '@/src/lib/config'
import { serve } from '@upstash/workflow/nextjs'
import { eq } from 'drizzle-orm'
import { render } from '@react-email/render'

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

  const welcomeEmailHtml = render(WelcomeEmail({ name: fullName }))

  await context.api.resend.call('send email', {
    token: config.env.resendToken,
    body: {
      from: 'Antonio F Nelson <contact@antonionelson.tech>',
      to: [email],
      subject: 'Welcome to the platform',
      html: welcomeEmailHtml,
    },
  })

  await context.sleep('wait-for-3-days', 60 * 60 * 24 * 3)

  while (true) {
    const state = await context.run('check-user-state', async () => {
      return await getUserState(email)
    })

    if (state === 'non-active') {
      await context.run('send-email-non-active', async () => {
        const reminderEmailHtml = render(WelcomeEmail({ name: fullName }))
        await context.api.resend.call('send email', {
          token: config.env.resendToken,
          body: {
            from: 'Antonio F Nelson <contact@antonionelson.tech>',
            to: [email],
            subject: 'Are you still with us?',
            html: reminderEmailHtml,
          },
        })
      })
    } else if (state === 'active') {
      await context.run('send-email-active', async () => {
        await context.api.resend.call('send email', {
          token: config.env.resendToken,
          body: {
            from: 'Antonio F Nelson <contact@antonionelson.tech>',
            to: [email],
            subject: 'Welcome Back!',
            html: `<p>Hey ${fullName}, good to see you again!</p>`,
          },
        })
      })
    }

    await context.sleep('wait-for-1-month', 60 * 60 * 24 * 30)
  }
})
