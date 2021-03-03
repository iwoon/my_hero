const { model, Schema } = require('mongoose')

const schema = new Schema({
    productId: { type: Number, required: true },
})

module.exports = model('Counter', schema)
