
const mongoose = require('mongoose')
const { Schema } = mongoose
const Counter = require('./counterSchema')

const orderSchema = new Schema({
    _id: { type: Number,  min: 1 },
    user: {
        type: Number,
        min: [1, "user should be equal or greater than 1"],
        validate: {
            validator: function (v) {
                return v >= 1 && Number.isInteger(v);
            },
            message: (props) => `${props.value} should be a positive integer!`,
        },
        required: [true, 'user is required'],
    },
    nftId: {
        type: Number,
        min: [1, "nftId should be equal or greater than 1"],
        validate: {
            validator: function (v) {
                return v >= 1 && Number.isInteger(v);
            },
            message: (props) => `${props.value} should be a positive integer!`,
        },
        required: [true, 'nftId is required'],
    },
    price: {
        type: Number,
        default: 0,
        min: [0, 'price can not be a negative number'],
    },
    from: {
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
                var re = /^0x[a-fA-F0-9]{40}$/;
                return re.test(v)
            },
            message: props => `${props.value} is invalid cryptocurrency address`
        },
        required: [true, 'from is invalid'],
    },
})

orderSchema.index({nftId: 1, from: 1},{unique: true})

orderSchema.pre('insertMany', async function (next, docs) {
    console.log('orderSchema. insertMany is triggered')
    if (Array.isArray(docs) && docs.length) {
       
        try {
            for (const doc of docs) {
                const seq = await Counter.increment('orderId')
                doc._id = seq
            }
        } catch (err) {
            next(err)
        }
    }
    next()
})

const order = mongoose.model('order', orderSchema)
module.exports = order