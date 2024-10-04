import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import 'dotenv/config'

import routerAuth from './api/auth.js'
import routerMe from './api/me.js'

const app = express()
const PORT = process.env.PORT || 4001

app.use(bodyParser.json())
app.use(cors())
app.use(morgan('tiny'))

app.use('/auth', routerAuth)
app.use('/me', routerMe)

app
  .listen(PORT, () => {
    console.log('Server running at port', PORT)
  })
  .on('error', (err) => {
    throw new Error(err.message)
  })
