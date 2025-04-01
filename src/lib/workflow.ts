import { Client as WorkflowClient } from '@upstash/workflow'
import config from './config'
import { Client as QstashClient, resend } from '@upstash/qstash'

export const workflowClient = new WorkflowClient({
  baseUrl: process.env.QSTASH_URL!,
  token: process.env.QSTASH_TOKEN!,
})

const qstashClient = new QstashClient({ token: process.env.QSTASH_TOKEN! })

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
      from: 'Antonio F Nelson <contact@antonionelson.tech>',
      to: [email],
      subject: subject,
      html: message,
    },
  })
}
