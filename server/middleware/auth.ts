import { z } from 'zod'
import { verifyToken } from '../utils/auth'

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)

  // Only protect /api/admin routes
  if (!url.pathname.startsWith('/api/admin')) {
    return
  }

  // Allow login endpoint without token
  if (url.pathname === '/api/admin/login') {
    return
  }

  const token = getCookie(event, 'auth_token')

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const user = verifyToken(token)
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid Token',
    })
  }

  // Attach user to event context for use in handlers
  event.context.user = user
})
