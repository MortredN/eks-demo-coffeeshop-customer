import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'

import routerCustomer from './api/customer.js'

const app = express()
const PORT = process.env.PORT || 4001

app.use(bodyParser.json())
app.use(cors())

app.use('/', routerCustomer)

app
  .listen(PORT, () => {
    console.log('Server running at port', PORT)
  })
  .on('error', (err) => {
    throw new Error(err.message)
  })
