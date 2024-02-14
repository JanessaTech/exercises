var mongoose = require('mongoose')

const initMyModelSchema = require('./myModel')

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

async function test1() {
    const MyModel = initMyModelSchema(mongoose)
    try {
        const myModel = new MyModel({someOtherField:'aaa'})
        const saved = await myModel.save()
        console.log('saved myModel = ', saved)
    } catch(e) {
        console.log('Failed to save myModel due to ', e)
    }
}

test1()

