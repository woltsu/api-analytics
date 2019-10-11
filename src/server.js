const express = require('express')
const cors = require('cors')
const { PORT } = require('./config')
const client = require('./elastic')
const app = express()

app.use(express.json())
app.use(cors())

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`)
  try {
    await client.ping()
    console.log('Connected to elasticsearch successfully!')
  } catch (e) {
    console.log('Connection to elasticsearch failed!', e)
  }
})
