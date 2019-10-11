const express = require('express')
const cors = require('cors')
const { PORT } = require('./config')
const app = express()

app.use(express.json())
app.use(cors())

console.log('ENV', process.env)

app.listen(PORT, () => {
  console.log(`api-analytics listening on port ${PORT}`)
})
