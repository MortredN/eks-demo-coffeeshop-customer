import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'

import routerAuth from './api/auth.js'

const app = express()
const PORT = process.env.PORT || 4001

app.use(bodyParser.json())
app.use(cors())

app.use('/auth', routerAuth)

app
  .listen(PORT, () => {
    console.log('Server running at port', PORT)
  })
  .on('error', (err) => {
    throw new Error(err.message)
  })
