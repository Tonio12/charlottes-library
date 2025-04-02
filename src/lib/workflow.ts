import { Client as WorkflowClient } from '@upstash/workflow'
import config from './config'

// Debug token loading
console.log(
  'QStash Token:',
  config.env.upstash.qstashToken ? 'Token exists' : 'Token is missing'
)

// Create a function to get the workflow client
export const getWorkflowClient = () => {
  // if (!config.env.upstash.qstashToken) {
  //   throw new Error('QStash token is not configured')
  // }
  return new WorkflowClient({
    token:
      'eyJVc2VySUQiOiI3MjgzN2MwOC02MGU0LTQ4NzMtODE2MS1jNjI5NDk4M2VmZDIiLCJQYXNzd29yZCI6IjM5NTQyMWYzN2ZmMDRlZWJiMWMxZTJhNmNlYTljYjI4In0=',
  })
}
