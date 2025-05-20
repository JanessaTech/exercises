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

async function init() {
    await Exam.collection.drop()
    await create()
}
// pick up the first document with rating which has 80 in it. update the the first 80 with the new value
// pay more attention: the array field must appear as part of the query document
async function update_$() {
    await init()
    await Exam.updateOne({rating:80}, {$set: {"rating.$": 100}})
}
// pick up the fist document with grades which has grade being 185, update  std to 20 for the first matched element in grades
async function update_$_embbeded() {
    await init()
    await Exam.updateOne({"grades.grade": 185}, {$set: {"grades.$.std": 20}})
}
// pick up the first document with grades, 
// in which there is at least one element, of which the grade > 200 and mean < 90, 
// update std to 200 for the first matched element in grades
async function update_$_multiple() {
    await init()
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
    await init()
    await Exam.updateOne({rating: 88}, {$set: {"rating.$[]": 888}})
}

// pick up the the first document in which rating has 88 in it, update std to 20 in all elements in the grades for the matched document
async function update_$_all_embbeded() {
    await init()
    await Exam.updateOne({rating: 88}, {$set: {"grades.$[].std": 20}})
}

// pick up the the first document in which rating has 88 in it, update elements greater or equal to 90 in it to 100
async function update_$_identifier() {
    await init()
    await Exam.updateOne(
        {rating: 88}, 
        {$set: {"rating.$[elem]": 100}},
        {arrayFilters: [ {"elem" : {$gte: 90}} ]}
    )
}

//pick up the first document in which rating has 88 in it, update std to 20 for the all elements whose grade == 185 and mean >=80 in the document
async function update_$_identifier_embbeded() {
    await init()
    await Exam.updateOne(
        {rating: 88},
        {$set: {"grades.$[elem].std" : 20}},
        //{ arrayFilters: [ { "elem.grade": { $gte: 80 }, "elem.std": { $gte: 5 } } ] }
        {arrayFilters: [{"elem.grade": {$eq: 185}, "elem.mean": {$gte: 80}}]}
    )
}

//pick up the first document in which rating has 88 in it, add 93 into rating array(92 will be ignored)
async function update_$_addToSet() {
    await init()
    await Exam.updateOne(
        {rating: 88},
        { $addToSet: {rating: [92, 93]}}
    )
}
//pick up the first document in which rating has 88 in it, 
// remove the first element in grades ({grades: 1} means remove the last element in grades)
async function update_$_pop() {
    await init()
    await Exam.updateOne(
        {rating: 88},
        {$pop: {grades: -1}}
    )
}

//pick up the first document in which rating has 88 in it,  
// append 100, 200, 300 to rating array
async function update_$_push() {
    await init()
    await Exam.updateOne(
        {rating: 88},
        {$push : {rating: {$each: [100, 200, 300]}}}
    )
}
//pick up the first document in which rating has 88 in it,  
// insert 100, 200, 300 to rating at position 1
async function update_$_position() {
    await init()
    await Exam.updateOne(
        {rating: 88},
        {$push: {
            rating: {
                    $each: [ 100,200, 300],
                    $position: 1
                }
            }
        }
    )
}
//pick up the first document in which rating has 88 in it,  
// insert 100, 200, 300 to rating at position 1
// once insertion is done, slice 3 elements from the head as the rating
async function update_$_slice() {
    await init()
    await Exam.updateOne(
        {rating: 88},
        {$push: {
            rating: {
                $each: [100, 200, 300],
                $position: 1,
                $slice: 3
            }
        }}
    )
}

// pick up the first document in which rating has 88 in it,
// insert {grade: 190, mean: 92, std: 7}, {grade: 160, mean: 92, std: 5}, {grade: 181, mean: 92, std: 9} to grades
// sort grades by grade in ascending order
// slice 3 elements from grades as the result
async function update_$_sort() {
    await init()
    await Exam.updateOne(
        {rating: 88},
        {
            $push: {
                grades: {
                    $each: [{grade: 190, mean: 92, std: 7}, {grade: 160, mean: 92, std: 5}, {grade: 181, mean: 92, std: 9}],
                    $slice: 3,
                    $sort: {grade: 1}
                }
            }
        }
    )
}

// first
// pick up the first document in which rating has 88 in it, remove elements >= 90 from rating
// second
// pick up the first document in which rating has 88 in it, remove elements in grades in which grade =185 and mean>=90
async function update_$_pull() {
    await init()
    //first
    await Exam.updateOne(
        {rating: 88},
        {$pull: {rating: {$gte: 90}}}
    )
    //second
    await Exam.updateOne(
        {rating: 88},
        {$pull: {grades: {grade: {$eq:185}, mean: {$gte: 90}}}}
    )
}

//pick up the first document in which rating has 88 in it, remove elements specified by [90, 92, 93] from rating
async function update_$_pullAll() {
    await init()
    await Exam.updateOne(
        {rating: 88},
        {$pullAll: {rating: [90, 92, 93]}}
    )
}

async function main() {
    try {
        connect()
        //await create()
        //await update_$()
        //await update_$_embbeded()
        //await update_$_multiple()
        //await update_$_all()
        //await update_$_all_embbeded()
        //await update_$_identifier()
        //await update_$_identifier_embbeded()
        //await update_$_addToSet()
        //await update_$_pop()
        //await update_$_push()
        //await update_$_position()
        //await update_$_slice()
        //await update_$_sort()
        //await update_$_pull()
        //await update_$_pullAll()
    } catch (err) {
        console.log(err)
    }
}

main().then().catch((err) => {
    console.log(err)
})
