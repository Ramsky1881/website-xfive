import prisma from './prisma'

export async function logAdminAction(
  adminId: string,
  action: string,
  entity: string,
  entityId: string | null | undefined,
  details: any,
  ip: string,
  userAgent: string
) {
  try {
    await prisma.adminAuditLog.create({
      data: {
        adminId,
        action,
        entity,
        entityId: entityId || null,
        details: details ? JSON.stringify(details) : null,
        ip,
        userAgent,
      },
    })
  } catch (e) {
    console.error('Failed to log audit action', e)
  }
}
