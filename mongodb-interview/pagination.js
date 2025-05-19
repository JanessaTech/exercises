const {default: mongoose, Schema} = require('mongoose')

const dataSchema = new Schema({data: String})
const Data = mongoose.model('Data', dataSchema)

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
        await Data.insertMany([
            {data: 'data1'},
            {data: 'data2'},
            {data: 'data3'},
            {data: 'data4'},
            {data: 'data5'},
            {data: 'data6'},
            {data: 'data7'},
        ])
    } catch (err) {
        console.log(err)
    }
    console.log('data is created')
}

async function paginate() {
    const total = await Data.countDocuments()
    const pageSize = 2
    const pages = Math.ceil(total / pageSize)
    let page = 1
    while (page <= pages) {
        const curPage = await Data.find().skip((page - 1) * pageSize).limit(pageSize)
        console.log(`---- page ${page} ------`)
        console.log(curPage)
        page++
    }

}

async function main() {
    try {
        connect()
        await create()
        await paginate()
    } catch(err) {
        console.log(err)
    }
}

main().then().catch((err) => {
    console.log(err)
})

