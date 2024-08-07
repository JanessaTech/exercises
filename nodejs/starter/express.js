var express = require('express');
var app = express();
var fs = require("fs");

var user = {
    "user4" : {
       "name" : "mohit",
       "password" : "password4",
       "profession" : "teacher",
       "id": 4
    }
 }

app.get('/', function(req, res) {
    console.log("Got a GET request from homepage")
    res.send('Hello GET')
})
app.post('/', function(req, res) {
    console.log('Got a POST request from homepage')
    res.send('Hello POST')
})
app.delete('/del_user', function(req, res) {
    console.log('Got a DELETE request from homepage')
    res.send('Hello DELETE')
})

app.get('/users', function(req, res) {
    fs.readFile(__dirname + '/data/users.json', 'utf8', function(err, data) {
        console.log(data)
        res.end(data)
    })
})
app.post('/users', function(req, res) {
    fs.readFile(__dirname + '/data/users.json', 'utf8', function(err, data) {
        data = JSON.parse(data)
        data['user4'] = user['user4']
        console.log(data)
        res.end(JSON.stringify(data))
    })
})

app.get('/users/:id', function(req, res) {
    fs.readFile(__dirname + '/data/users.json', 'utf8', function(err, data) {
        var users = JSON.parse(data)
        var user = users['user' + req.params.id]
        console.log(user)
        res.end(JSON.stringify(user))
    })
})
app.delete('/users/:id', function(req, res) {
    fs.readFile(__dirname + '/data/users.json', 'utf8', function(err, data) {
        var users = JSON.parse(data)
        delete users['user' + req.params.id]
        console.log(users)
        res.end(JSON.stringify(users))
    })
})


var server = app.listen(8081, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})