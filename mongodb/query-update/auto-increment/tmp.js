var mongoose = require('mongoose')
var Schema = mongoose.Schema

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

const counterSchema = new Schema(
    {
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
    }
);

const Counter = mongoose.model('Counter', counterSchema)

async function test() {
    const modelName = 'mymodle'
    try {
        const saved = await Counter.findByIdAndUpdate({_id: modelName}, { $inc: { seq: 1 } },{ new: true, upsert: true })
        console.log('saved = ', saved)
    } catch(err) {
        console.log('Failed to update counterModel')
    }    
}

test()