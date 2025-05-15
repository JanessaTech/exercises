const { connect, Schema, default: mongoose } = require("mongoose");

const bookSchema = new Schema({
    title: {
        type: String,
        required:[true, 'Title is required'],
        index: true
    },
    author: {
        type: Schema.Types.ObjectId, 
        ref: 'Author',
        required: [true, 'author is required']
    },
    price: {
        type: Number,
        min: [0, 'Price should be greater or equal to 0'],
        default: 0,
        required: [true, 'Price is required']
    },
    isbn: {
        type: String,
        validate: {
            validator: function(v) {
                var re = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/
                return re.test(v)
            }, 
            message: props => `${props.value} is invalid ISBN`
        },
        required: [true, 'ISBN is required']
    }
})
const authorSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'firstName is required']
    },
    lastName: {
        type: String,
        required: [true, 'lastName is required']
    },
    age: {
        type: Number,
        min: [18, 'The min age is not less than 18'],
        required:  [true, 'Age is required']
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: '{VALUE} is not supported'
        },
        default: 'male',
        required: [true, 'gender is required'],
    }
}, {
    virtuals: {
        fullName: {
            get() {
                return this.firstName + ' ' + this.lastName
            }
        }
    },
    toJSON: { virtuals: true }
})
authorSchema.virtual('books', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'author'
})

const Book = mongoose.model('Book', bookSchema)
const Author = mongoose.model('Author', authorSchema)

async function createData() {
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
    } catch(e) {
        console.log('Failed to save authors and books')
        console.log(e)
        process.exit()
    }
}

async function queryAuthors() {
    const authors = await Author.find({gender: 'female', age: {$gt: 20}}).sort({age: 1}).populate('books')
    console.log(JSON.stringify(authors, null, 2))
    //console.log(authors[0].books)
    //console.log(authors[1].books)
    //const res = await Book.find({price: {$gt: 100}, 'author.age' : {lte: 30}}).sort({price: 1}).populate('author')
    //console.log(res)
}

async function queryBooks() {
    const books  = await Book.find({price: {$lte: 50}})
                        .sort({price: 1})
                        .select({price: 1, isbn: 1})
                        //.populate('author', {_id: 0, age: 0, __v:0})
                        .populate('author','age gender')
    console.log(books)
}
async function aggregate() {
    const agg = await Book.aggregate([
        {
            $lookup: {
                from: "authors",
                localField: "author",
                foreignField: "_id",
                as: "R"
            }
        },
        {
            $unwind: {
            path: "$R",
            preserveNullAndEmptyArrays: true
            }
        },
        {
            $project : {
                title: 1,
                price: 1,
                isbn: 1,
                author_id:"$R._id",
                author_age:"$R.age",
                author_gender:"$R.gender"
            }
        },
        {
            $match: {
                $and:[
                    {price: {$lte: 100}},
                    {author_gender: "female"}
                  ]
            }
        },
        {
            $group: {
                _id: "$author_id",
                sum: {
                    $sum: "$price"
                }
            }
        }
            
    ])
    console.log(agg)
}

async function run() {
    await connect('mongodb://127.0.0.1:27017/demo')
    //await createData()
    await queryAuthors()
    //await queryBooks()
    //await aggregate()
    

    console.log('Run ended')
}

run()
.catch(err => console.log(err))