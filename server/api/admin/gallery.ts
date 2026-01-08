import { z } from 'zod'
import prisma from '../../utils/prisma'
import { logAdminAction } from '../../utils/audit'
import { rateLimit } from '../../utils/rateLimit'
import { handlePrismaError } from '../../utils/error'

const createSchema = z.object({
  title: z.string().optional(),
  imageUrl: z.string().min(1),
  category: z.string().default('general'),
  position: z.number().int().default(0),
  isActive: z.boolean().default(true),
})

const updateSchema = createSchema.partial()

export default defineEventHandler(async (event) => {
  const method = event.method

  // Rate Limit: 60 req/min
  await rateLimit(event, { key: 'admin-crud', limit: 60, window: 60 })

  if (method === 'GET') {
    return await prisma.galleryItem.findMany({
      orderBy: { position: 'asc' }
    })
  }

  if (method === 'POST') {
    const body = await readBody(event)
    const result = createSchema.safeParse(body)
    if (!result.success) throw createError({ statusCode: 400, data: result.error.errors })

    try {
      const item = await prisma.galleryItem.create({ data: result.data })

      const user = event.context.user
      const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
      const ua = getHeader(event, 'user-agent') || 'unknown'
      await logAdminAction(user.id, 'CREATE', 'GalleryItem', item.id, body, ip, ua)

      return item
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
      const item = await prisma.galleryItem.update({
        where: { id },
        data: result.data
      })

      const user = event.context.user
      const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
      const ua = getHeader(event, 'user-agent') || 'unknown'
      await logAdminAction(user.id, 'UPDATE', 'GalleryItem', item.id, body, ip, ua)

      return item
    } catch (e) {
      handlePrismaError(e)
    }
  }

  if (method === 'DELETE') {
    const query = getQuery(event)
    const id = query.id as string
    if (!id) throw createError({ statusCode: 400, message: 'Missing id' })

    const item = await prisma.galleryItem.delete({ where: { id } })

    const user = event.context.user
    const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
    const ua = getHeader(event, 'user-agent') || 'unknown'
    await logAdminAction(user.id, 'DELETE', 'GalleryItem', item.id, null, ip, ua)

    return { success: true }
  }
})
