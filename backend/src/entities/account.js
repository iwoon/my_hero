const { Schema, model } = require("mongoose");
const schema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    created: { type: Date, default: Date.now },
    role: {
        type: Schema.Types.ObjectId,
        enum: ['Admin', 'Cashier', 'Member'],
        required: true,
        ref: "Role"
        // *** module.exports = model('Role', schema)
    },

});

module.exports = model("Account", schema);