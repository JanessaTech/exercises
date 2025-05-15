const {default: mongoose, Schema} = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, 'title is required'],
        index: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
        require: [true, 'author is required']
    },
    price: {
        type: Number,
        min: [0, 'price >= 0'],
        default: 0,
        require: [true, 'price is required']
    },
    isbn : {
        type: String,
        validate: {
            validator: function(v) {
                var re = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/
                return re.test(v)
            },
            message: props => `${props.value} is is invalid ISBN`
        },
        require: [true, 'isbn is required']
    }
})

const authorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: [true, 'firstName is required']
    },
    lastName: {
        type: String,
        require: [true, 'lastName is required']
    },
    age: {
        type: Number,
        min: [18, 'min >= 18'],
        require: [true, 'age is required']
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: '{VALUE} is not supported'
        },
        default: 'male',
        require: [true, 'genger is required']
    }
}, {
    virtuals: {
        fullName: {
            get() {
                return this.firstName + ' ' + this.lastName
            }
        }
    },
    toJSON: {virtuals: true}
})
authorSchema.virtual('books', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'author'
})

const Book = mongoose.model('Book', bookSchema)
const Author = mongoose.model('Author', authorSchema)

function connect() {
    mongoose.connect('mongodb://127.0.0.1/interview')
    let db = mongoose.connection
    db.once('open', ()  => {
        console.log('connected to database')
    })
    db.on('error', (err) => {
        console.log()
    })
}

async function create() {
    const author1 = new Author({ firstName: 'John', lastName: 'Tomas', age: 45, gender: 'male'})
    const author2 = new Author({ firstName: 'jineffer', lastName: 'Jwong', age: 22, gender: 'female'})
    const author3 = new Author({ firstName: 'Linda', lastName: 'Huala', age: 38, gender: 'female'})
    const book11 = new Book({title: 'hero11', author: author1._id, price: 100, isbn: '1-56619-909-1'})
    const book12 = new Book({title: 'hero12', author: author1._id, price: 50, isbn: '1-56619-909-2'})
    const book13 = new Book({title: 'hero13', author: author1._id, price: 200, isbn: '1-56619-909-3'})
    const book14 = new Book({title: 'hero14', author: author1._id, price: 40, isbn: '1-56619-909-4'})
    const book21 = new Book({title: 'hero21', author: author2._id, price: 120, isbn: '2-56619-909-1'})
    const book22 = new Book({title: 'hero22', author: author2._id, price: 20, isbn: '2-56619-909-2'})
    const book31 = new Book({title: 'hero31', author: author3._id, price: 40, isbn: '3-56619-909-1'})
    const book32 = new Book({title: 'hero32', author: author3._id, price: 80, isbn: '3-56619-909-2'})
    const book33 = new Book({title: 'hero33', author: author3._id, price: 120, isbn: '3-56619-909-3'})
    try {
        await author1.save()
        await author2.save()
        await author3.save()
        await book11.save()
        await book12.save()
        await book13.save()
        await book14.save()
        await book21.save()
        await book22.save()
        await book31.save()
        await book32.save()
        await book33.save()
    } catch (err) {
        console.log(err)
    }
}

async function queryAuthors() {
    const res = await Author.find({gender: 'female', age: {$gt: 20}}).sort({age: 1}).populate('books')
    console.log(JSON.stringify(res, null, 2))
}

async function queryBooks() {
    const res = await Book.find({price: {$lte: 50}})
                        .sort({price: 1})
                        .select({title: 1, price: 1})
                        .populate('author', 'fullName age')
    console.log(JSON.stringify(res, null, 2))
}

async function aggragate() {
    const agg = await Book.aggregate([
        {
            $lookup: 
           {
             from: "authors",
             localField: "author",
             foreignField: "_id",
             as: "R"
           }
        },
        {
            $unwind:
           {
             path: "$R",
             includeArrayIndex: 'string',
             preserveNullAndEmptyArrays: true
           }
        },
        {
            $project:
           {
             title: 1,
             price: 1,
             isbn: 1,
             author_id: "$R._id",
             author_age:"$R.age",
             author_gender:"$R.gender"
           }
        },
        {
            $match:
           {
             price: {$gte: 100}
           }
        },
        {
            $group:
           {
             _id: "$author_gender",
             sum_price: {
               $sum: "$price"
             }
           }
        }
    ])

    console.log(agg)
}

async function main() {
    connect()
    try {
        //await create()
        //await queryAuthors()
        //await queryBooks()
        await aggragate()
    } catch(err) {
        console.log(err)
    }
}

main().then().catch((err) => {
    console.log(err)
})