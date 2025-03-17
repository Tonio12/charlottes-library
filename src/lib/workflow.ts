import { Client as WorkflowClient } from '@upstash/workflow'
import config from './config'

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.uptash.qstashUrl,
  token: config.env.uptash.qstashToken,
})
