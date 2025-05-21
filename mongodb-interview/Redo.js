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
                                  tags: ["book", "school"],
                                  children: [{ "product": "abc", "score": 8 },
                                    { "product": "xyz", "score": 7 }]
                                })
        const arr3 = new MyArray({name: 'arr3', 
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

// pick up documents with tags which have "school" and "book" in the array
async function query1() {
    const res = MyArray.find({tags: {$all: ["school", "book"]}})
}
// pick up documents with score in which there is at least one element which is > 40 and < 110
async function query2() {
    const res = await MyArray.find({score: {$elemMatch : {$gt : 40, $lt: 110}}})
}
// pick up documents with children in which there is at least one element whose product is 'xyz' and score > 6
async function query3() {
    const res = await MyArray.find({children: {$elemMatch: {product: "xyz", score: {$gt: 6}}}})
}

// pick up the first document, whose score has 60
async function query4() {
    const res = MyArray.find({score: 60})
}

// pick up all documents, of which score don't have 100
async function query5() {
    const res = MyArray.find({score: {$ne: 100}})
}

async function main() {
    try {
        connect()
        //await create()
        //await query1()
        //await query2()
        //await query3()
        //await query4()
        await query5()
    } catch (err) {
        console.log(err)
    }
}

main().then().catch((err) => {
    console.log(err)
})


