import { Client as WorkflowClient } from '@upstash/workflow'
import config from './config'
import { Client as QstashClient, resend } from '@upstash/qstash'

// Debug token loading
console.log(
  'QStash Token:',
  config.env.upstash.qstashToken ? 'Token exists' : 'Token is missing'
)

// Create a function to get the workflow client
export const getWorkflowClient = () => {
  if (!config.env.upstash.qstashToken) {
    throw new Error('QStash token is not configured')
  }
  return new WorkflowClient({
    token: config.env.upstash.qstashToken,
  })
}

// Create a function to get the QStash client
const getQstashClient = () => {
  if (!config.env.upstash.qstashToken) {
    throw new Error('QStash token is not configured')
  }
  return new QstashClient({ token: config.env.upstash.qstashToken })
}

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
    const qstashClient = getQstashClient()
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
