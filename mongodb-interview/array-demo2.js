const {default: mongoose, Schema} = require('mongoose')
const gradeSchema = new Schema({
    grade: Number,
    mean: Number,
    std: Number
})
const examSchema = new Schema({
    rating: [Number],
    grades: [gradeSchema]
})

const Exam = mongoose.model('Exam', examSchema)

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
        await Exam.insertMany([
            {rating: [85, 80, 80], grades:[{grade: 80, mean: 75, std:8}, 
                                           {grade: 85, mean: 90, std:5}, 
                                           {grade: 85, mean: 85, std:8}]},

            {rating: [88, 90, 92], grades:[{grade: 180, mean: 75, std:8}, 
                                           {grade: 185, mean: 90, std:5}, 
                                           {grade: 185, mean: 85, std:8}]},

            {rating: [80, 100, 90], grades:[{grade: 280, mean: 75, std:8}, 
                                            {grade: 285, mean: 90, std:5}, 
                                            {grade: 285, mean: 85, std:8}]}
        ])
    } catch(err) {
        console.log(err)
    }
    console.log('data is created')
}

// pick up the first document with rating which has 80 in it. update the the first 80 with the new value
// pay more attention: the array field must appear as part of the query document
async function update_$() {
    await Exam.updateOne({rating:80}, {$set: {"rating.$": 100}})
}
// pick up the fist document with grades which has grade being 100, update the corresponding std to 20
async function update_$_embbeded() {
    await Exam.updateOne({"grades.grade": 100}, {$set: {"grades.$.std": 20}})
}
// pick up the first document with grades, 
// in which there is at least one element, of which the grade > 200 and mean < 90, 
// update std to 200 for the corresponding element
async function update_$_multiple() {
    await Exam.updateOne(
        {
            grades: {$elemMatch: {grade: {$gt: 200}, mean: {$lt: 90}}}
        },
        {
            $set:{"grades.$.std": 200}
        })
}

// pick up the the first document in which rating has 88 in it, update all elements in the array to 888 
async function update_$_all(){
    await Exam.updateOne({rating: 88}, {$set: {"rating.$[]": 888}})
}

async function update_$_all_embbeded() {
    await Exam.updateOne({rating: 88}, {$set: {"grades.$[].std": 20}})
}

// pick up the the first document in which rating has 88 in it, update elements greater or equal to 90 in it to 100
async function update_$_identifier() {
    await Exam.updateOne(
        {rating: 88}, 
        {$set: {"rating.$[elem]": 100}},
        {arrayFilters: [ {"elem" : {$gte: 90}} ]}
    )
}
async function main() {
    try {
        connect()
        await create()
        //await update_$()
        //await update_$_embbeded()
        //await update_$_multiple()
        //await update_$_all()
        //await update_$_all_embbeded()
        await update_$_identifier()
    } catch (err) {
        console.log(err)
    }
}

main().then().catch((err) => {
    console.log(err)
})
