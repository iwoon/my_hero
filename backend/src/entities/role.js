const { model, Schema } = require('mongoose')

const schema = new Schema({
    name: { type: String, default: "-", required: true },
    created: { type: Date, default: Date.now },
})

module.exports = model('Role', schema)
