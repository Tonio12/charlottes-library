import { Client as WorkflowClient } from '@upstash/workflow'
import config from './config'

// Debug token loading
const token = config.env.upstash.qstashToken
console.log(
  'QStash Token Debug:',
  token ? `Token exists (${token.substring(0, 10)}...)` : 'Token is missing'
)

// Create a function to get the workflow client
export const getWorkflowClient = () => {
  return new WorkflowClient({
    token: config.env.upstash.qstashToken,
  })
}
