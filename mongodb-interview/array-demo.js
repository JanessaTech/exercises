const {default: mongoose, Schema} = require('mongoose')

const childSchema = new Schema({
    product: String,
    score: Number
})
const parentSchema = new Schema({
    name: String,
    score: [Number],
    tags: [String],
    children: [childSchema]
})

const MyArray = mongoose.model('MyArray', parentSchema)

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
        connect()
        const arr1 = new MyArray({name: 'arr1', 
                                  score: [10, 50, 100], 
                                  tags: ["school", "book", "bag", "headphone", "appliance" ],
                                  children: [{ "product": "abc", "score": 10 },
                                    { "product": "xyz", "score": 5 }]
                                })
        const arr2 = new MyArray({name: 'arr2', 
                                  score: [60, 90, 120], 
                                  tags: ["school", "book"],
                                  children: [{ "product": "abc", "score": 8 },
                                    { "product": "xyz", "score": 7 }]
                                })
        const arr3 = new MyArray({name: 'arr2', 
                                  score: [200, 300, 400], 
                                  tags: ["electronics", "school"],
                                  children: [{ "product": "abc", "score": 7 },
                                    { "product": "def", "score": 8 }]})
        await arr1.save()
        await arr2.save()
        await arr3.save()
    } catch (err) {
        console.log(err)
    }
    console.log('data is created')
}

async function query1() {
    const res = await MyArray.find({tags: {$all: ["school", "book"]}})
    console.log(JSON.stringify(res, null, 2))
}
async function query2() {
    const res = await MyArray.find({score: {$elemMatch: {$gt: 40, $lt: 110}}})
    console.log(JSON.stringify(res, null, 2))
}
async function query3() {
    const res = await MyArray.find({children: {$elemMatch: {product: 'xyz', score: {$gt : 6}}}})
    console.log(JSON.stringify(res, null, 2))
}

async function main() {
    try {
        connect()
        //await create()
        //await query1()
        //await query2()
        await query3()
    } catch (err) {
        console.log(err)
    }
}

main().then().catch((err) => {
    console.log(err)
})


