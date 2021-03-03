const express = require('express')
const app = express()

app.get('/products', (req, res) => {
    res.json([11, 22, 33, 44, 55])
})

app.get('/products/search', (req, res) => {
    res.json({ productName: req.query.name })
})

app.get('/products/:id', (req, res) => {
    res.json({ productId: req.params.id })
})

const PORT = process.env.PORT || 3000
const ENV = process.env.NODE_ENV || 'development'
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
    console.log(`Env on: ${ENV}`)
    console.log(`Press Ctrl+C to quit.`)
})