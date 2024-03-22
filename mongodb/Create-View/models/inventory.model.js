const mongoose = require('mongoose')
const { Schema } = mongoose

const inventorySchema = new Schema({
    _id: Number,
    price: Number,
    quantity: Number
}, { collection: 'inventory', versionKey: false })

const inventory = mongoose.model('inventory', inventorySchema)

module.exports = inventory