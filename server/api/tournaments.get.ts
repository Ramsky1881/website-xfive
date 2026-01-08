import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  return await prisma.tournament.findMany({
    where: { isActive: true },
    orderBy: { startDate: 'desc' },
    select: {
      id: true,
      title: true,
      description: true,
      imageUrl: true,
      slug: true,
      startDate: true,
      endDate: true,
      location: true,
      prizePool: true,
    }
  })
})
