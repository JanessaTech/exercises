const {default: mongoose, Schema} = require('mongoose')

const studentSchema = new Schema({
    name: String,
    age: Number,
    addr: String
})

const Student = mongoose.model('Student', studentSchema)


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
    const stu1 = new Student({name: 'stu1', age: 10, addr: 'xian'})
    const stu2 = new Student({name: 'stu2', age: 20, addr: 'xian'})
    const stu3 = new Student({name: 'stu3', age: 30, addr: 'xian'})
    try {
        await stu1.save()
        await stu2.save()
        await stu3.save()
    } catch(err) {
        console.log(err)
    }
    console.log('data is created!')
}

async function update_inc() {
    const res = await Student.findOneAndUpdate({name: 'stu1'}, {$inc: {age: 2}}, {new: true})
    console.log(JSON.stringify(res, null, 2))
}
async function update_set() {
    const res = await Student.findOneAndUpdate({name: 'stu2'}, {$set: {age: 40, addr: 'shanghai'}}, {new: true})
    console.log(JSON.stringify(res, null, 2))
}
async function main() {
    try {
        connect()
        //await create()
        //await update_inc()
        await update_set()
        //await query()
    } catch(err) {
        console.log(err)
    }
}

main().then().catch((err) => {
    console.log(err)
})