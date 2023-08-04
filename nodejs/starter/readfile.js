var fs = require("fs")

function synRead() {
    var data = fs.readFileSync('./data/input.txt')
    console.log(data.toString())
    console.log("Reading file in syn")
}

function asynRead() {
    fs.readFile('./data/input.txt', function(err, data) {
        if (err) return console.error(err)
        console.log(data.toString()); 
    })
    console.log('Reading file in asyn')
}

//synRead()
asynRead()
