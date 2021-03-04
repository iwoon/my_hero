require('./src/configs/db')
const express = require('express')
const app = express()
const cors = require('cors')
const corsOptions = require('./src/configs/cors')

app.use(cors(corsOptions.policy))

app.use('/api/v1', require('./src/routes/routes'))

const PORT = process.env.PORT || 3000
const ENV = process.env.NODE_ENV || 'development'
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
    console.log(`Env on: ${ENV}`)
    console.log(`Press Ctrl+C to quit.`)
})