import 'dotenv/config'

import { Redis } from 'ioredis'
import { envSchema } from '../src/infra/env/env.js'

export async function setup() {
  const env = envSchema.parse(process.env)

  const redis = new Redis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    db: env.REDIS_DB,
  })

  await redis.flushdb()
  await redis.quit()
}
