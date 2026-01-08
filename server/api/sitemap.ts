import prisma from '../utils/prisma'

export default defineEventHandler(async () => {
  const [features, games, tournaments] = await Promise.all([
    prisma.feature.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }),
    prisma.game.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }),
    prisma.tournament.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } })
  ])

  const urls = []

  // Features
  for (const f of features) {
    urls.push({ loc: `/features/${f.slug}`, lastmod: f.updatedAt })
  }

  // Games
  for (const g of games) {
    urls.push({ loc: `/games/${g.slug}`, lastmod: g.updatedAt })
  }

  // Tournaments
  for (const t of tournaments) {
    urls.push({ loc: `/tournaments/${t.slug}`, lastmod: t.updatedAt })
  }

  return urls
})
