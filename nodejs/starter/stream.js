var fs = require('fs')
var zlib = require('zlib')

function readStreamFn() {
    var data = ''

    var readerStream = fs.createReadStream('./data/input.txt')
    readerStream.setEncoding('UTF8');
    
    readerStream.on('data', function(chunk) {
        data += chunk
    });
    readerStream.on('end', function() {
        console.log(data)
    })
    readerStream.on('error', function(err) {
        console.log(err.stack)
    })
    
    console.log('Program ended')
}

function writeStream() {
    var data = 'Hello Janessa'
    var writerStream = fs.createWriteStream('./data/output.txt')
    writerStream.write(data, 'UTF-8')
    writerStream.end()
    writerStream.on('finish', function() {
        console.log('write is completed')
    })
    writerStream.on('error', function(err) {
        console.log(err.stack)
    })
    console.log("Program Ended");
}

function pipingStream() {
    var readerStream = fs.createReadStream('./data/input.txt')
    var writerStream = fs.createWriteStream('./data/output.txt')
    readerStream.pipe(writerStream)
    console.log('Program ended')

}

function chainStream() {
    fs.createReadStream('./data/input.txt')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('./data/input.txt.gz'))

    console.log("File Compressed.");
}

//readStreamFn()
//writeStream()
//pipingStream()
chainStream()

