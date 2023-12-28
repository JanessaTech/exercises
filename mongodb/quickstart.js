const mongoose = require('mongoose')

const kittySchema = new mongoose.Schema({
    name: String
  })
kittySchema.methods.speak = function speak() {
    const greeting = this.name
      ? 'Meow name is ' + this.name
      : 'I don\'t have a name';
    console.log(greeting);
  };
const Kitten = mongoose.model('Kitten', kittySchema);

function connect() {
    mongoose.connect('mongodb://127.0.0.1/test')  //we recommend using 127.0.0.1 instead of localhost. That is because Node.js 18 and up,Node.js will resolve localhost to the IPv6 address ::1 and Mongoose will be unable to connect, unless the mongodb instance is running with ipv6 enabled.

    let db = mongoose.connection;

    db.once('open', () => {
    console.log('Connected to the database.');
    });

    db.on('error', (err) => {
    console.log(`Database error: ${err}`);
    });
}

async function create() {
    
    const fluffy = new Kitten({ name: 'fluffy' });
    await fluffy.save();
    fluffy.speak()  
}

async function query() {
    const kittens = await Kitten.find({name: /^fluff/});
    console.log(kittens);
}

function main() {
    connect()
    //create()
    try {
        query()
    }catch(err) {
        console.log(err)
    }
    
}

main()