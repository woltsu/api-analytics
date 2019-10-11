const {
  ELASTICSEARCH_HOST
} = process.env

module.exports.PORT = 8000
module.exports.ELASTICSEARCH_HOST = ELASTICSEARCH_HOST
module.exports.INIT_DB_RETRY_LIMIT = 20