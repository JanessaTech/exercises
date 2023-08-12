var express = require('express')
var app = express()

app.get('/', function(req, res) {
    var err = new Error('something goes wrong')
    next(err)
})

app.use(function(err,req, res, next) {
    res.status(500);
    res.send("Oops, something went wrong.")
})

app.listen(3000);
// visit : http://127.0.0.1:3000/