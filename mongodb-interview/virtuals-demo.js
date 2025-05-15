const {default: mongoose, Schema} = require('mongoose')
const toJSON = require('./toJSON.plugin')

function connect() {
    mongoose.connect('mongodb://127.0.0.1/interview')
    let db = mongoose.connection
    db.once('open', () => {
        console.log('connected to database')
    })
    db.on('error', (err) => {
        console.log('database failed: ', err)
    })
}

const userSchema = new mongoose.Schema({
    //_id: { type: Schema.ObjectId },
    name: String,
    email: {type: String, unique: true },
    referedBy: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
}, {
    toJSON: { virtuals: true }
})

userSchema.plugin(toJSON)
userSchema.virtual('refereals', {
    ref: 'User',
    localField: '_id',
    foreignField: 'referedBy',
})

const User = mongoose.model('User', userSchema)

async function create() {
    const userA = new User({name: 'userA', email: 'userA@google.com'})
    try {
        await userA.save()
        await User.insertMany([
            {name: 'userB', email: 'userB@google.com', referedBy: userA._id},
            {name: 'userC', email: 'userC@google.com', referedBy: userA._id},
            {name: 'userD', email: 'userD@google.com', referedBy: userA._id}
        ])
    } catch(err) {
        console.log('failed to create users: ', err)
    } 
}

async function query() {
    const user = await User.find({name: 'userA'}).populate('refereals')
    console.log(JSON.stringify(user, null, 2))
}

async function main() {
    try {
        connect()
        //await create()
        await query()
    } catch (err) {
        console.log('failed in main: ', err)
    }
}

main().then().catch((err) => {

})