const express = require('express')

const app = express()
const cors = require('cors')
const methodOverride = require('method-override')
const helmet = require('helmet')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')

const configDB = require('./configs/db')
const { notFoundHandler, errorHandler } = require('./configs/handler')
const routing = require('./routes')
require('dotenv').config()

const port = process.env.APP_PORT || 3000;


app.use(methodOverride())
app.use(helmet())
app.use(cors())
app.options('*', cors())
configDB.retryConnection() 
app.use(express.json())

app.use(xss());
app.use(mongoSanitize());
app.use(routing)
app.use(notFoundHandler) 
app.use(errorHandler) 

app.listen(port, () => {
    console.info(`app running in port ${port}`)
})
  