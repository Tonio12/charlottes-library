import { Client as WorkflowClient } from '@upstash/workflow'
import config from './config'
import { Client as QstashClient, resend } from '@upstash/qstash'

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.uptash.qstashUrl,
  token: config.env.uptash.qstashToken,
})

const qstashClient = new QstashClient({ token: config.env.uptash.qstashToken })

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string
  subject: string
  message: string
}) => {
  await qstashClient.publishJSON({
    api: {
      name: 'email',
      provider: resend({ token: config.env.resendToken }),
    },
    body: {
      from: 'Antonio F Nelson <nelson.antonio.gmail.com>',
      to: [email],
      subject: subject,
      html: message,
    },
  })
}
