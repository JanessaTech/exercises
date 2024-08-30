const mongoose = require('mongoose')
const { Schema } = mongoose;
const Order = require('./models/order.model')
const Inventory = require('./models/inventory.model')
const Sale = require('./models/sales.model')

function connect() {
    mongoose.connect('mongodb://127.0.0.1/demo')

    let db = mongoose.connection;

    db.once('open', () => {
    console.log('Connected to the database.');
    });

    db.on('error', (err) => {
    console.log(`Database error: ${err}`);
    });
}

connect()

async function insertData() {
    try {
        await Inventory.insertMany([
            { _id: 100, price: 20, quantity: 125},
            { _id: 101, price: 10, quantity: 234 },
            { _id: 102, price: 15, quantity: 432 },
            { _id: 103, price: 17, quantity: 320 } 
        ], { ordered: false, rawResult: false})
        console.log('data is inserted into inventory successfully')
    } catch (err) {
        console.log('Failed to insert data into inventory due to', err)
    }

    try {
        await Order.insertMany([
            { _id: 201, custid: 301, prodId: 100, numPurchased: 20 },
            { _id: 202, custid: 302, prodId: 101, numPurchased: 10 },
            { _id: 203, custid: 303, prodId: 102, numPurchased: 5 },
            { _id: 204, custid: 303, prodId: 103, numPurchased: 15 },
            { _id: 205, custid: 303, prodId: 103, numPurchased: 20 },
            { _id: 206, custid: 302, prodId: 102, numPurchased: 1 },
            { _id: 207, custid: 302, prodId: 101, numPurchased: 5 },
            { _id: 208, custid: 301, prodId: 100, numPurchased: 10 },
            { _id: 209, custid: 303, prodId: 103, numPurchased: 30 }
        ])
        console.log('data is inserted into inventory successfully')
    } catch (err) {
        console.log('Failed to insert data into orders due to', err)
    }
}

async function createView() {
    /*
    Notice that we could only run it on mongoe shell in console to create view.
    Pls run the codes below in console manually when the data created insertData is ready

    ------------------ Run the script in mongoe shell in console manually  ---------------
    db.createView( "sales", "orders", [
        {
           $lookup:
              {
                 from: "inventory",  //the name of target collection (you need add s if it has it)
                 localField: "prodId",
                 foreignField: "_id",
                 as: "inventoryDocs"
              }
        },
        { $unwind: "$inventoryDocs" },  // in compass, it is the value of path
        {
           $project:
              {
                _id: 1,
                prodId: 1,
                numPurchased: 1,
                price: "$inventoryDocs.price"
              }
        },  
     ] )
     ----------------------------------------------end of the script-----------------------
     Run the `db.sales.find()` in mongoe shell in console to check the result. You will see like below:
     { "_id" : 201, "prodId" : 100, "numPurchased" : 20, "price" : 20 }
     { "_id" : 202, "prodId" : 101, "numPurchased" : 10, "price" : 10 }
     { "_id" : 203, "prodId" : 102, "numPurchased" : 5, "price" : 15 }
     { "_id" : 204, "prodId" : 103, "numPurchased" : 15, "price" : 17 }
     { "_id" : 205, "prodId" : 103, "numPurchased" : 20, "price" : 17 }
     { "_id" : 206, "prodId" : 102, "numPurchased" : 1, "price" : 15 }
     { "_id" : 207, "prodId" : 101, "numPurchased" : 5, "price" : 10 }
     { "_id" : 208, "prodId" : 100, "numPurchased" : 10, "price" : 20 }
     { "_id" : 209, "prodId" : 103, "numPurchased" : 30, "price" : 17 }
     */
}
// Run this fun only when the collection `sales` is available
async function runAggregate() {
    try {
        const results = await Sale.aggregate([
            {
                $group:
                   {
                      _id: "$prodId",
                      amountSold: { $sum: { $multiply: [ "$price", "$numPurchased" ] } }
                   }
             }
        ])
        for (const res of results) {
            console.log(res)
        }
    } catch (err) {
        console.log('Failed to run aggregate on sales due to', err)
    }  
}

insertData()
//createView()
//runAggregate()


