import { Redis } from '@upstash/redis'
import { H3Event } from 'h3'

// Fallback in-memory store for Dev/Sandbox
const memoryStore = new Map<string, { count: number; expires: number }>()

// Production Redis
let redis: Redis | null = null

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  })
}

interface RateLimitConfig {
  key: string
  limit: number
  window: number // in seconds
}

export async function rateLimit(event: H3Event, config: RateLimitConfig): Promise<void> {
  const ip = getRequestIP(event, { xForwardedFor: true }) || '127.0.0.1'
  const finalKey = `rate_limit:${config.key}:${ip}`

  if (redis) {
    try {
      const remaining = await redis.limit(config.key, config.limit + 'm', config.limit)
      // Note: Upstash basic example usually involves a simple incr/expire or use @upstash/ratelimit
      // Here we will implement a simple sliding window or fixed window using standard Redis commands

      const requests = await redis.incr(finalKey)
      if (requests === 1) {
        await redis.expire(finalKey, config.window)
      }

      if (requests > config.limit) {
        throw createError({
          statusCode: 429,
          statusMessage: 'Too Many Requests',
        })
      }
      return
    } catch (e) {
      // If Redis fails, log and maybe fallback or fail open/closed depending on policy
      // For now, if Redis is configured but fails, we might want to fallback to memory or throw
      if ((e as any).statusCode === 429) throw e
      console.error('Redis error', e)
    }
  }

  // Fallback / Dev implementation
  const now = Date.now()
  const record = memoryStore.get(finalKey)

  if (record) {
    if (now > record.expires) {
      memoryStore.set(finalKey, { count: 1, expires: now + config.window * 1000 })
    } else {
      record.count++
      if (record.count > config.limit) {
        throw createError({
          statusCode: 429,
          statusMessage: 'Too Many Requests',
        })
      }
    }
  } else {
    memoryStore.set(finalKey, { count: 1, expires: now + config.window * 1000 })
  }
}
