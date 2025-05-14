const mongoose = require('mongoose')

const kittenSchema = new mongoose.Schema({
    name: String
})
kittenSchema.methods.speak = function speak () {
    const greeting = 'Jane wins'
    console.log(greeting)
}

const Kitten = mongoose.model('Kitten', kittenSchema)

function connect() {
    mongoose.connect('mongodb://127.0.0.1/test')
    let db = mongoose.connection
    db.once('open', () => {
        console.log('connected to database')
    })
    db.on('error', (e) => {
        console.log(`database error : ${e}`)
    })
}

async function create() {
    const Janessa = new Kitten({name: "Janessa"})
    await Janessa.save()
    Janessa.speak()
}

async function query() {
    const res = await Kitten.find({name: /^Ja/})
    console.log(res)
}

async function main() {
    connect()
    try {
        await create()
        await query()
    } catch(e) {
        console.log(e)
    }
}

main().then().catch((e) => {
    console.log(e)
})