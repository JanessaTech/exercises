const { MongoClient } = require('mongodb');  
const uri = "mongodb://localhost:27017";  

async function monitor() {
    const client = new MongoClient(uri)
    await client.connect()
    const collection = client.db('interview').collection('nftevents')
    console.log('start monitor ...')
    const pineline = [{ $match: { "operationType": "insert", "fullDocument.event": "Transfer" } }]
    const changeStream = collection.watch(pineline)
    changeStream.on('change', (change) => {
        console.log(change.fullDocument)
    })
}

monitor().then().catch((err) => {
    console.log(err)
})