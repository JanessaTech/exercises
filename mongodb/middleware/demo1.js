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



async function test1() {
    studentSchema.pre('save', function(next) {
        console.log('pre executing 1 ...')
        next()
    })
    studentSchema.pre('save', function(next) {
        console.log('pre executing 2 ...')
        next()
    })
    studentSchema.post('save', function(doc) {
        console.log('post executing 1')
    })
    studentSchema.post('save', function(doc) {
        console.log('post executing 2. _id=', doc._id)
    })
    
    const Student = mongoose.model('Student', studentSchema)
    const stu1 = new Student({
        name: 'stu1',
        age:7
    })

    /*
    How to receive saved obj: #1
    try {
        const savedStu1 = await stu1.save()
        console.log('savedStu1 = ', savedStu1)
    }catch(e) {
        console.error('Failed to save stu due to ', e)
    }*/
    //How to receive saved obj: #2
    stu1.save().then((savedStu1) => {
        if (!savedStu1) {
            throw new Error("no savedStu1 found") 
        }
        console.log(savedStu1)
    }).catch((error) => {
        console.error('Failed to save stu due to ', error) 
    })
}

async function test2() {
    studentSchema.pre('save', function(next) {
        console.log('pre executing 1 ...')
        const err = new Error('something went wrong')
        next(err)
    })
    studentSchema.pre('save', function(next) {
        console.log('pre executing 2 ...')
        next()
    })
    studentSchema.post('save', function(doc) {
        console.log('post executing 1')
    })
    studentSchema.post('save', function(doc) {
        console.log('post executing 2. _id=', doc._id)
    })
    
    const Student = mongoose.model('Student', studentSchema)
    const stu1 = new Student({
        name: 'stu1',
        age:7
    })

    /*
    How to receive saved obj: #1
    try {
        const savedStu1 = await stu1.save()
        console.log('savedStu1 = ', savedStu1)
    }catch(e) {
        console.error('Failed to save stu due to ', e)
    }*/
    //How to receive saved obj: #2
    stu1.save().then((savedStu1) => {
        if (!savedStu1) {
            throw new Error("no savedStu1 found") 
        }
        console.log(savedStu1)
    }).catch((error) => {
        console.error('Failed to save stu due to ', error) 
    })
    /*
    it doesn't work from now on
    stu1.save(function(err) {
        console.log('Failed to save stu1 due to: ', err)
    })*/
}

//test1()

test2()
