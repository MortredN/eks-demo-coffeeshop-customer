import jwt from 'jsonwebtoken'
import { eq } from 'drizzle-orm'
import db from '../db/index.js'
import { customerTable } from '../db/schema.js'

export const authenticateToken = async (req, res, next) => {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error('Cannot create token')
  }

  const authHeader = req.headers['authorization']
  const accessToken = authHeader && authHeader.split(' ')[1]
  if (accessToken == null) return res.status(401).json({ message: 'Unauthorized' })

  try {
    const { email } = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
    const [customer] = await db
      .select()
      .from(customerTable)
      .where(eq(customerTable.email, email))
      .limit(1)

    req.customer = customer
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  next()
}
