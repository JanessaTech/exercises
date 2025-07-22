
const {default: mongoose, Schema, mongo} = require('mongoose')

const bookSchema = new Schema({
    title: {
        type: String,
        require: [true, 'title is required']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author'
    },
    price: {
        type: Number,
        min: [],
        require: [true, 'price is required']
    },
    isbn: {
        type: String,
        validate: {
            validator: function(v) {
                const re = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/
                return re.test(v)
            },
            message: props => `${props.value} is invalid`
        },
        require: [true, 'isbn is required']
    }
})
const authorSchema = new Schema({
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
        min: [18, 'age >= 18'],
        require: [true, 'age is required']
    },
    gender: {
        type: String,
        enum: {
            values: ['female', 'male'],
            message: '{VALUE} is not supported'
        },
        require: [true, 'gender is required']
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
    db.once('open', () => {
        console.log('database connected')
    })
    db.on('error', (error) => {
        console.log('database error:', error)
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
    } catch(e) {
        console.log('Failed to save authors and books')
        console.log(e)
        process.exit()
    }
    console.log('data is created')
}
// find authors, of whihc gender is female and age >= 20, age exists
// sort by age by ascending sort, populate books
async function queryAuthors() {
   const res = await Author.find({gender: 'female', age: {$gte: 20}}).sort({age: 1}).populate('books')
   console.log(JSON.stringify(res, null, 2))
}

// find books, of which the price <= 50, sort by price by ascending sort, 
// select title and price fields, populate author with these fields shown: firstName lastName gender
async function queryBooks() {
    const res = await Book.find({price: {$lte: 50}}).sort({price: 1})
                          .select({title: 1, price: 1})
                          .populate('author', 'firstName lastName gender')
    console.log(JSON.stringify(res, null, 2))
}
async function aggragate() {
    
}

async function main() {
    try {
        connect()
        //await create()
        //await queryAuthors()
        //await queryBooks()
        await aggragate()
    } catch(err) {
        console.log(err)
        process.exit(1)
    }
}

main().then().catch((err) => {
    console.log(err)
})