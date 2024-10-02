import jwt from 'jsonwebtoken'
import { eq } from 'drizzle-orm'
import db from '../db/index.js'
import { userTable } from '../db/schema.js'

export const authenticateToken = async (req, res, next) => {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error('Cannot create token')
  }

  const authHeader = req.headers['authorization']
  const accessToken = authHeader && authHeader.split(' ')[1]
  if (accessToken == null) return res.sendStatus(401)

  try {
    const { email } = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
    const [user] = await db.select().from(userTable).where(eq(userTable.email, email)).limit(1)

    req.user = user
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.sendStatus(401)
    }
  }
  next()
}
