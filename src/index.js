import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import 'dotenv/config'

import routerAuth from './api/auth.js'
import routerMe from './api/me.js'

const app = express()
const PORT = 4000

app.use(bodyParser.json())
app.use(cors())
app.use(morgan('tiny'))

// Health check
app.get('/', async (req, res) => {
  return res.status(200).json({ success: true })
})

const router = express.Router()

router.use('/auth', routerAuth)
router.use('/me', routerMe)

// AWS ALB does not support path rewrite
app.use('/api/customer', router)

app
  .listen(PORT, () => {
    console.log('Server running at port', PORT)
  })
  .on('error', (err) => {
    throw new Error(err.message)
  })
