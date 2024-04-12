const mongoose = require('mongoose')
const Order = require('./orderSchema')

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

async function insertData() {
    const from = '0xb129c8aD40e31bC421F37b5B418CF1Bfe1175536'
    const user = 1
    const prices = [10, 20, 30]
    const nftIds = [1, 2, 3]
    const ands = []
    for (let i = 0; i < nftIds.length; i++) {
        ands.push({$and: [{nftId: nftIds[i]}, {from: from}]})
    }
    const query = {$or: ands}
    const savedNFTs = await Order.find(query)
    const pairs = new Set()
    savedNFTs.forEach((nft) => pairs.add(`${nft.from}-${nft.nftId}`))
    console.log(pairs)
    const newOrders = []
    for (let i = 0; i < nftIds.length; i++) {
        const pair = `${from}-${nftIds[i]}`
        if (!pairs.has(pair)) {
            newOrders.push({user: user, nftId: nftIds[i], from: from, price: prices[i]})
        }
    }

    console.log('newOrders = ', newOrders)

    try {
        const res = await Order.insertMany(newOrders, { ordered: false, rawResult: false})
        console.log('res =', res)
    } catch (err) {
        console.log('Failed to insert data due to ', err)
    }
}

insertData()


