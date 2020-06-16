'use strict'
const merge = require('webpack-merge')
const sitEnv = require('./sit.env')

module.exports = merge(sitEnv, {
  NODE_ENV: '"development"'
})
