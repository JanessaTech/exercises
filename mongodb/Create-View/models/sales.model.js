const mongoose = require('mongoose')
const { Schema } = mongoose

const saleSchema = new Schema({
    _id: Number,
    prodId: Number,
    numPurchased: Number,
    price: Number
}, { collection: 'sales', versionKey: false })

const sale = mongoose.model('sale', saleSchema)
module.exports = sale