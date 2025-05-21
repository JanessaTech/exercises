const {default: mongoose, Schema} = require('mongoose')

const deviceSchema = new Schema({
    temperature: Number,
    timestamp: Date
})

const Device = mongoose.model('Device', deviceSchema)

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
        await Device.insertMany([
            {temperature: 20, timestamp: new Date('2025-01-20T01:00:00Z')},
            {temperature: 20, timestamp: new Date('2025-01-20T02:00:00Z')},
            {temperature: 30, timestamp: new Date('2025-02-20T01:00:00Z')},
            {temperature: 40, timestamp: new Date('2025-02-20T02:00:00Z')},
            {temperature: 40, timestamp: new Date('2025-03-20T01:00:00Z')},
            {temperature: 20, timestamp: new Date('2025-03-20T02:00:00Z')},
            {temperature: 60, timestamp: new Date('2025-04-20T01:00:00Z')},
            {temperature: 50, timestamp: new Date('2025-04-20T02:00:00Z')},
            {temperature: 10, timestamp: new Date('2025-05-21T03:00:00Z')},
            {temperature: 30, timestamp: new Date('2025-05-21T02:00:00Z')}
        ])
    } catch (err) {
        console.log(err)
    }
    console.log("data is created")
}

async function aggregate() {
    
}

async function main() {
    try {
        connect()
        await create()
        await aggregate()
    } catch (err) {
        console.log(err)
    }
}

main().then().catch((err) => {
    console.log(err)
})

