const express = require('express')
const cors = require('cors')
const { PORT } = require('./config')
const { initDb } = require('./elastic')
const router = require('./router')
const app = express()

app.use(express.json())
app.use(cors())
app.use('*', router)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
  initDb()
})
