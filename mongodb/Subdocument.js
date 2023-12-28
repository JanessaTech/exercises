const mongoose = require('mongoose')
const { Schema } = mongoose;

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

function subdocumentDefaults() {
    const childSchema = new mongoose.Schema({
        name: String,
        age: {
          type: Number,
          default: 0
        }
      });
      const subdocumentSchema = new mongoose.Schema({
        child: {
          type: childSchema,
          default: () => ({})
        }
      });
      const Subdoc = mongoose.model('Subdoc', subdocumentSchema);
      const doc = new Subdoc();
      console.log(doc.child)
      
}

subdocumentDefaults()