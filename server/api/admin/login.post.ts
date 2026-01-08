import { z } from 'zod'
import { comparePassword, signToken } from '../../utils/auth'
import prisma from '../../utils/prisma'
import { rateLimit } from '../../utils/rateLimit'
import { logAdminAction } from '../../utils/audit'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export default defineEventHandler(async (event) => {
  // Rate limit: 5 attempts / 10 mins (600 seconds)
  await rateLimit(event, { key: 'login', limit: 5, window: 600 })

  const body = await readBody(event)
  const result = loginSchema.safeParse(body)

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid input',
      data: result.error.errors,
    })
  }

  const { email, password } = result.data

  const admin = await prisma.adminUser.findUnique({
    where: { email },
  })

  if (!admin) {
    // Fake verify to prevent timing attacks
    await comparePassword('dummy', '$2b$10$dummyhashdummyhashdummyhashdummyhashdummyhash')
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    })
  }

  const valid = await comparePassword(password, admin.passwordHash)
  if (!valid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    })
  }

  // Generate JWT
  const token = signToken({ id: admin.id, email: admin.email })

  // Set Cookie
  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  // Audit Log
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const ua = getHeader(event, 'user-agent') || 'unknown'
  await logAdminAction(admin.id, 'LOGIN', 'AdminUser', admin.id, null, ip, ua)

  return { success: true }
})
