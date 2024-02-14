const mongoose = require('mongoose')
const { Schema } = mongoose;

function connect() {
    mongoose.connect('mongodb://127.0.0.1/stu-test')

    let db = mongoose.connection;

    db.once('open', () => {
    console.log('Connected to the database.');
    });

    db.on('error', (err) => {
    console.log(`Database error: ${err}`);
    });
}

connect()

const studentSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    age: {
        type: Number,
        min: 6, max: 12,
        message: '{VALUE} in age is not supported'
    }
})

async function findByIdAndUpdate() {
    const Student = mongoose.model('Student', studentSchema)
    const id = '65cc6a9a656eda148c08398d'
    try {
        const updatedResult  = await Student.findByIdAndUpdate({_id: id}, {age: '15'}, {new: true, upsert: true})
        console.log('updatedResult = ', updatedResult)
    } catch(e) {
        console.error('Failed to update student due to ', e)
    }
}

async function inc() {
    const Student = mongoose.model('Student', studentSchema)
    const id = '65cc6a9a656eda148c08398c'
    try {
        const updatedResult  = await Student.findByIdAndUpdate({_id: id}, {$inc: {age: 1}}, {new: true, upsert: true})
        console.log('updatedResult = ', updatedResult)
    } catch(e) {
        console.error('Failed to update student due to ', e)
    }
}

async function set() {
    const Student = mongoose.model('Student', studentSchema)
    const id = '65cc6a9a656eda148c08398c'
    try {
        const updatedResult  = await Student.findByIdAndUpdate({_id: id}, {$set: {age: 2}}, {new: true, upsert: true})
        console.log('updatedResult = ', updatedResult)
    } catch(e) {
        console.error('Failed to update student due to ', e)
    }
}

//findByIdAndUpdate()
//inc()
set()