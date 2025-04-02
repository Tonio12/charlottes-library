import { Client as WorkflowClient } from '@upstash/workflow'
import config from './config'
import { Client as QstashClient, resend } from '@upstash/qstash'

// Debug token loading
console.log(
  'QStash Token:',
  config.env.upstash.qstashToken ? 'Token exists' : 'Token is missing'
)

export const workflowClient = new WorkflowClient({
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
  try {
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
  } catch (error) {
    console.error('QStash Error:', error)
    throw error
  }
}
