import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  return await prisma.feature.findMany({
    where: { isActive: true },
    orderBy: { position: 'asc' },
    select: {
      id: true,
      title: true,
      description: true,
      imageUrl: true,
      slug: true,
      link: true
    }
  })
})
