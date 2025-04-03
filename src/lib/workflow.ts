import { Client as WorkflowClient } from '@upstash/workflow'
import config from './config'

export const getWorkflowClient = () => {
  console.log(
    'QStash Token Debug:',
    config.env.upstash.qstashToken.substring(0, 5)
  )
  const client = new WorkflowClient({
    token: config.env.upstash.qstashToken,
  })

  return client
}
