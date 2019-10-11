const elasticsearch = require('@elastic/elasticsearch')
const { ELASTICSEARCH_HOST } = require('../config')

const client = new elasticsearch.Client({
  node: ELASTICSEARCH_HOST
})

const initDb = async () => {
  try {
    await client.indices.create({
      index: 'test',
    })
  } catch (e) {
    if (e.meta.body.error.type !== 'index_already_exists_exception') {
      console.error('Error', e)
    }
  }
}

const addLog = async () => {
  try {
    await client.index({
      index: 'test',
      type: 'tests',
      body: {
        'testName': 'TestName',
        'wat': new Date()
      }
    })
  } catch (e) {
    console.error('Error', e)
  }
}

initDb()
addLog()

module.exports = client