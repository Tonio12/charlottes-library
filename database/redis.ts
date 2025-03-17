import config from '@/src/lib/config'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: config.env.uptash.redisUrl,
  token: config.env.uptash.redisToken,
})

export default redis
