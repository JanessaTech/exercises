const {default: mongoose, Schema} = require('mongoose')

const bulkSchema  = new Schema({
    _id: Number,
    data: String
})
const Bulk = mongoose.model('Bulk', bulkSchema)

function connect() {
    mongoose.connect('mongodb://127.0.0.1/interview')
    let db = mongoose.connection
    db.once('open', () => {
        console.log('connected to database')
    })
    db.on('error', (e) => {
        console.log(`database error : ${e}`)
    })
}

async function create() {
    try {
        await Bulk.insertMany([
            {_id: 1, data: 'data1'},
            {_id: 2, data: 'data2'},
            {_id: 3, data: 'data3'},
        ])
    } catch (err) {
        console.log(err)
    }
    console.log('data is created')
}

async function init() {
    await Bulk.collection.drop()
    await create()
}

async function bulkOp() {
    await init()
    const res = await Bulk.bulkWrite([
        {insertOne: {document: {_id: 4, data: 'data4'}}},
        {updateOne: {filter: {_id: 2}, update: {$set: {data: 'new data2'}}}},
        {deleteOne: {filter: {_id: 3}}}
    ], {ordered: true})
}
async function query() {
    const res = await Bulk.find()
    console.log(res)
}

async function main() {
    try {
        connect()
        //await create()
        await bulkOp()
        await query()
    } catch (err) {
        console.log(err)
    }
}

main().then().catch((err) => {
    console.log(err)
})