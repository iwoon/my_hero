const mongoose = require('mongoose')
require('../entities/counter')
require('../entities/category')
require('../entities/product')
// require('../entities/role')
// require('../entities/account')

mongoose.set('useCreateIndex', true)

mongoose.connect('mongodb://localhost/istock', {
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => console.log('Mongo Connected!'))

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open')
})

mongoose.connection.on('error', (err) => {
  console.log('Mongoose default connection error: ' + err)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected')
})

//catches ctrl+c event
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination')
    process.exit(0)
  })
})