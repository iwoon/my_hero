const { model, Schema } = require('mongoose')

const schema = new Schema({
    productId: Number,
    name: { type: String, default: "-", required: true },
    image: { type: String, default: "" },
    stock: { type: Number, default: 0, required: true },
    price: { type: Number, default: 0, required: true },
    created: { type: Date, default: Date.now },
    category: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Category"
        // *** module.exports = model('Category', schema)
    },
})

module.exports = model('Product', schema)
// mongoose convert model name to plural and lowercase