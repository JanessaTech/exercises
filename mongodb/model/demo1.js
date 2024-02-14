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
/*
studentSchema.statics.hello = function hello(name) {
    console.log('my name is ', name)
}*/

studentSchema.static('hello', function(name) {
    console.log('my name is ', name)
})

const Student = mongoose.model('Student', studentSchema)
Student.hello('JanessaTech')
