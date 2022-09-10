/* eslint-disable no-console */
require('dotenv').config()
const mongoose = require('mongoose')

const dbUrl = process.env.DB_CONNECTION_URL

mongoose.Promise = global.Promise

const retryConnection = () => mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  keepAlive: true,
  auto_reconnect: true,
  poolSize: 10,
}, (err) => {
  if (err) {
    console.error(`Failed to connect to ${dbUrl}`)
    setTimeout(retryConnection(), 50000)
  } else {
    console.info('mongoDB Connected')
  }
})

mongoose.connection.on('disconnected', (err) => {
  console.info(`DB Lost connection ${err}`)
})

mongoose.connection.on('reconnected', (err) => {
  console.info(`DB Reconnected ${err}`)
})


mongoose.set('debug', (collectionName, method, query, doc) => {
  console.info(`${collectionName}.${method}`, JSON.stringify(query), doc);
});

module.exports = {
  retryConnection
}
