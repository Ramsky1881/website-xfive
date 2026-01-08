import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const SECRET = process.env.JWT_SECRET || 'dev-secret-do-not-use-in-prod'

export function signToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET)
  } catch (e) {
    return null
  }
}

export function hashPassword(password: string) {
  return bcrypt.hash(password, 10)
}

export function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}
