import { Prisma } from '@prisma/client'

export function handlePrismaError(e: any) {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    // P2002: Unique constraint failed
    if (e.code === 'P2002') {
      const target = (e.meta?.target as string[]) || 'field'
      throw createError({
        statusCode: 409,
        statusMessage: 'Conflict',
        message: `Unique constraint failed on: ${target}`,
      })
    }
  }

  console.error('Unhandled Database Error:', e)
  throw createError({
    statusCode: 500,
    statusMessage: 'Internal Server Error',
    message: 'A database error occurred.',
  })
}
