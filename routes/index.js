const express = require('express')

const routing = express()
const user = require('./user.route')

routing.use(user)

module.exports = routing
