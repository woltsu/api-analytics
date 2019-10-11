const elasticsearch = require('@elastic/elasticsearch')
const { ELASTICSEARCH_HOST, INIT_DB_RETRY_LIMIT } = require('../config')

const client = new elasticsearch.Client({
  node: ELASTICSEARCH_HOST
})

const initDb = async (attempt = 1) => {
  console.log(`initDb attempt ${attempt}/${INIT_DB_RETRY_LIMIT}...`)
  try {
    await client.indices.create({
      index: 'request',
    })
    console.log('Connected to elasticsearch successfully!')
  } catch (e) {
    if (e.meta && e.meta.body && e.meta.body.error && e.meta.body.error.type === 'index_already_exists_exception') {
      console.log('Connected to elasticsearch successfully!')
      return
    }
    if (attempt < INIT_DB_RETRY_LIMIT) {
      setTimeout(() => {
        initDb(attempt + 1)
      }, 2000)
    } else {
      console.error(`Failed connecting to elasticsearch after ${INIT_DB_RETRY_LIMIT} attempts!`)
      process.exit(1)
    }
  }
}

const addLog = async (requestData) => {
  try {
    await client.index({
      index: 'request',
      type: 'requests',
      body: {
        ...requestData,
        timestamp: new Date()
      }
    })
  } catch (e) {
    console.error('Error', e)
  }
}

module.exports = {
  initDb,
  addLog
}