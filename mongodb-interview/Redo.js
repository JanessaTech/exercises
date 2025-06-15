const {default: mongoose, Schema} = require('mongoose')


const typeSchema = new Schema({
    name: String,
    age: Number,
    isMale: Boolean,
    birtheday: Date,
    nested: {
        addr: String,
    },
    lucky: [Number],
    mixed: Schema.Types.Mixed,
    map: Map
})

const MyType = mongoose.model('MyType', typeSchema)

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
        const t1 = new MyType
        t1.name = 'Jane'
        t1.age = 10
        t1.birtheday = new Date()
        t1.nested.addr = 'xian'
        t1.lucky = [1, 2, 3, 4]
        t1.mixed = [{xx: 'aa'}, [12]]
        t1.map = new Map([['1', 'value1'], ['2', 'value2']])  // the key must be string type

        const t2 = new MyType
        t2.name = 'Leo'
        t2.age = 11
        t2.birtheday = new Date()
        t2.nested.addr = 'beijing'
        t2.lucky.unshift(5, 6, 7, 8)  // pay attention to how to insert elements into array
        t2.mixed = [{xx: 'aa'}, [12]]
        t2.map = new Map([['3', 'value3'], ['4', 'value4']])  // the key must be string type

        await t1.save()
        await t2.save()
    } catch(err) {
        console.log(err)
    }
    console.log('data is created')
}

async function query() {
    const agg = await MyType.aggregate([
        {
            $match: {
                birtheday: {$gte: new Date("20250501T00:00:00Z")}
            }
        },
        {
            $group: {
                _id: {$dateToString: {format: "%Y-%m-%d", date: "$birtheday"}},
                cnt: {$sum: 1}
            }
        }
    ])
    console.log(agg)
}

async function main() {
    try {
        connect()
        //await create()
        await query()
    } catch (err) {
        console.log(err)
    }
}

main().then().catch((err) => {
    console.log(err)
})