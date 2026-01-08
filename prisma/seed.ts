import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    console.warn('⚠️  ADMIN_EMAIL or ADMIN_PASSWORD not found in environment.')
    console.warn('⚠️  Creating dev-only admin: admin@example.com / changeme')
  }

  const finalEmail = email || 'admin@example.com'
  const finalPassword = password || 'changeme'

  const passwordHash = await bcrypt.hash(finalPassword, 10)

  const admin = await prisma.adminUser.upsert({
    where: { email: finalEmail },
    update: {
      passwordHash: passwordHash
    },
    create: {
      email: finalEmail,
      passwordHash: passwordHash,
    },
  })

  console.log(`✅ Admin user seeded: ${admin.email}`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
