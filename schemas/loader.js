'use strict'

const fp = require('fastify-plugin')

module.exports = fp(function schemasLoaderPlugin (fastify, opts, next) {
  fastify.addSchema(require('./dotenv.json'))
  next()
})
