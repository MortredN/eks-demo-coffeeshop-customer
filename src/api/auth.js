import express from 'express'
import bcrypt from 'bcrypt'
import _ from 'lodash'
import { eq } from 'drizzle-orm'
import db from '../db/index.js'
import { customerTable } from '../db/schema.js'
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/auth.js'
import { authenticateToken } from '../middlewares/auth.js'

const router = express.Router()

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body

  if (_.isEmpty(email) || _.isEmpty(password) || _.isEmpty(name)) {
    return res.status(400).json('Missing fields')
  }

  const [customer] = await db
    .select()
    .from(customerTable)
    .where(eq(customerTable.email, email))
    .limit(1)
  if (customer) {
    return res.status(400).json({ message: 'Account already existed' })
  }

  const saltRounds = 10
  const hash = bcrypt.hashSync(password, saltRounds)

  const newCustomer = (
    await db.insert(customerTable).values({ email, password: hash, name }).returning()
  )[0]
  if (!newCustomer) {
    return res.status(500).json('Customer created not successfully')
  }

  const accessToken = generateAccessToken(newCustomer)
  const refreshToken = generateRefreshToken(newCustomer)
  return res.status(200).json({
    data: {
      accessToken,
      refreshToken,
      customer: { email: newCustomer.email, name: newCustomer.name }
    }
  })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (_.isEmpty(email) || _.isEmpty(password)) {
    return res.status(400).json('Missing fields')
  }

  const [customer] = await db
    .select()
    .from(customerTable)
    .where(eq(customerTable.email, email))
    .limit(1)
  if (!customer) {
    return res.status(404).json({ message: 'Email or password is incorrect' })
  }

  const compareResult = bcrypt.compareSync(password, customer.password)
  if (!compareResult) {
    return res.status(404).json({ message: 'Email or password is incorrect' })
  }

  const accessToken = generateAccessToken(customer)
  const refreshToken = generateRefreshToken(customer)
  return res.status(200).json({
    data: {
      accessToken,
      refreshToken,
      customer: { email: customer.email, name: customer.name }
    }
  })
})

router.post('/refresh-token', async (req, res) => {
  const { refreshToken } = req.body
  let customer = await verifyRefreshToken(refreshToken)
  customer = (
    await db.select().from(customerTable).where(eq(customerTable.email, email)).limit(1)
  )[0]
  if (!customer) {
    return res.status(401).json({ message: 'Token invalid' })
  }

  const newAccessToken = generateAccessToken(customer)
  const newRefreshToken = generateRefreshToken(customer)
  return res.status(200).json({
    data: {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      customer: { email: customer.email, name: customer.name }
    }
  })
})

export default router
