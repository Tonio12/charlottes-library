import { drizzle } from 'drizzle-orm/neon-http'
import config from '@/src/lib/config'
import { neon } from '@neondatabase/serverless'

const sql = neon(config.env.databaseUrl)

export const db = drizzle({ client: sql })
