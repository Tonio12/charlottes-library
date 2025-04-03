import { Client as WorkflowClient } from '@upstash/workflow'
import config from './config'

// Debug token loading
console.log(
  'QStash Token:',
  config.env.upstash.qstashCurrentSigningToken
    ? 'Token exists'
    : 'Token is missing'
)

// Create a function to get the workflow client
export const getWorkflowClient = () => {
  return new WorkflowClient({
    token: config.env.upstash.qstashCurrentSigningToken,
  })
}
