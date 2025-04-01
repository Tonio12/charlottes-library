import { Client as WorkflowClient } from '@upstash/workflow'
import config from './config'
import { Client as QstashClient, resend } from '@upstash/qstash'

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
})

const qstashClient = new QstashClient({ token: config.env.upstash.qstashToken })

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
