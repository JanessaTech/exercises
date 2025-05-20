const {default: mongoose, Schema} = require('mongoose')

const nftEventSchema = new Schema({
    nftId: Number,
    event: String
})

const NFTEvent = mongoose.model('NFTEvent', nftEventSchema)

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
    const event1 = new NFTEvent({nftId: 1, event: 'Transfer'})
    const event2 = new NFTEvent({nftId: 1, event: 'mint'})
    try {
        await event1.save()
        await event2.save()
    } catch(err) {
        console.log(err)
    }

    console.log('data is created')
}

async function main() {
    connect()
    await create()
}

main().then().catch((err) => {
    console.log(err)
})