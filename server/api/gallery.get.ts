import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  return await prisma.galleryItem.findMany({
    where: { isActive: true },
    orderBy: { position: 'asc' },
    select: {
      id: true,
      title: true,
      imageUrl: true,
      category: true,
    }
  })
})
