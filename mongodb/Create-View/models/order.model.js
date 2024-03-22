const mongoose = require('mongoose')
const { Schema } = mongoose

const orderSchema = new Schema({
    _id: Number,
    custid: Number,
    prodId: Number,
    numPurchased: Number
})

const order = mongoose.model('orders', orderSchema)
module.exports = order