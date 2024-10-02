import express from 'express'
import bcrypt from 'bcrypt'
import _ from 'lodash'
import db from '../db/index.js'
import { userTable } from '../db/schema.js'
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/auth.js'
import { authenticateToken } from '../middlewares/auth.js'

const router = express.Router()

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body

  if (_.isEmpty(email) || _.isEmpty(password) || _.isEmpty(name)) {
    return res.status(400).json('Missing fields')
  }

  const saltRounds = 10
  const hash = bcrypt.hashSync(password, saltRounds)

  const newUser = await db.insert(userTable).values({ email: email, password: hash }).returning()[0]
  if (!newUser) {
    return res.sendStatus(500).json('User created not successfullyF')
  }

  const accessToken = generateAccessToken({ email })
  const refreshToken = generateRefreshToken({ email })
  return res.status(200).json({ data: { accessToken, refreshToken } })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (_.isEmpty(email) || _.isEmpty(password)) {
    return res.status(400).json('Missing fields')
  }

  const [user] = await db.select().from(userTable).where(eq(userTable.email, email)).limit(1)
  if (!user) {
    return res.status(404).json({ message: 'Email or password is incorrect' })
  }

  const compareResult = bcrypt.compareSync(password, user.password)
  if (!compareResult) {
    return res.status(404).json({ message: 'Email or password is incorrect' })
  }

  const accessToken = generateAccessToken({ email })
  const refreshToken = generateRefreshToken({ email })
  return res.status(200).json({ data: { accessToken, refreshToken } })
})

router.post('/refresh-token', async (req, res) => {
  const { refreshToken } = req.body
  const email = await verifyRefreshToken(refreshToken)

  const newAccessToken = generateAccessToken({ email })
  const newRefreshToken = generateRefreshToken({ email })
  return res
    .status(200)
    .json({ data: { accessToken: newAccessToken, refreshToken: newRefreshToken } })
})

router.post('/test', authenticateToken, async (req, res) => {
  return res.status(200).json({ data: req.user })
})

export default router
