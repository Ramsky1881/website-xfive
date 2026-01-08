import { z } from 'zod'
import prisma from '../../utils/prisma'
import { logAdminAction } from '../../utils/audit'
import { rateLimit } from '../../utils/rateLimit'
import { handlePrismaError } from '../../utils/error'

const createSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().min(1),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z.string().transform((str) => new Date(str)),
  location: z.string().optional(),
  prizePool: z.string().optional(),
  isActive: z.boolean().default(true),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
})

const updateSchema = createSchema.partial()

export default defineEventHandler(async (event) => {
  const method = event.method

  // Rate Limit: 60 req/min
  await rateLimit(event, { key: 'admin-crud', limit: 60, window: 60 })

  if (method === 'GET') {
    return await prisma.tournament.findMany({
      orderBy: { startDate: 'desc' }
    })
  }

  if (method === 'POST') {
    const body = await readBody(event)
    const result = createSchema.safeParse(body)
    if (!result.success) throw createError({ statusCode: 400, data: result.error.errors })

    try {
      const tournament = await prisma.tournament.create({ data: result.data })

      const user = event.context.user
      const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
      const ua = getHeader(event, 'user-agent') || 'unknown'
      await logAdminAction(user.id, 'CREATE', 'Tournament', tournament.id, body, ip, ua)

      return tournament
    } catch (e) {
      handlePrismaError(e)
    }
  }

  if (method === 'PUT') {
    const query = getQuery(event)
    const id = query.id as string
    if (!id) throw createError({ statusCode: 400, message: 'Missing id' })

    const body = await readBody(event)
    const result = updateSchema.safeParse(body)
    if (!result.success) throw createError({ statusCode: 400, data: result.error.errors })

    try {
      const tournament = await prisma.tournament.update({
        where: { id },
        data: result.data
      })

      const user = event.context.user
      const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
      const ua = getHeader(event, 'user-agent') || 'unknown'
      await logAdminAction(user.id, 'UPDATE', 'Tournament', tournament.id, body, ip, ua)

      return tournament
    } catch (e) {
      handlePrismaError(e)
    }
  }

  if (method === 'DELETE') {
    const query = getQuery(event)
    const id = query.id as string
    if (!id) throw createError({ statusCode: 400, message: 'Missing id' })

    const tournament = await prisma.tournament.delete({ where: { id } })

    const user = event.context.user
    const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
    const ua = getHeader(event, 'user-agent') || 'unknown'
    await logAdminAction(user.id, 'DELETE', 'Tournament', tournament.id, null, ip, ua)

    return { success: true }
  }
})
