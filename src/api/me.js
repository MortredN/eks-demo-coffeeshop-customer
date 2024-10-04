import express from 'express'
import _ from 'lodash'
import { authenticateToken } from '../middlewares/auth.js'

const router = express.Router()

router.get('/info', authenticateToken, async (req, res) => {
  const customer = req.customer
  return res.status(200).json({ customer })
})

export default router
