const {default: mongoose, Schema} = require('mongoose')

const infoSchema = new Schema({
    addr:String
})

const personSchema = new Schema({
    name: String,
    info: infoSchema
})

const Person = mongoose.model('Person', personSchema)

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
    await Person.insertMany([
        {name: 'stu1', info: {addr: 'xian'}},
        {name: 'stu2', info: {addr: 'beijing'}},
        {name: 'stu3', info: {addr: 'shanghai'}}
    ]
    )

    console.log('data is created')
}

async function query() {
    const res = await Person.find({'info.addr': 'xian'})
    console.log(JSON.stringify(res, null, 2))
}

async function main() {
    try {
        connect()
        //await create()
        await query()
    } catch(err) {
        console.log(err)
    }
}

main().then().catch((err) => {
    console.log(err)
})

