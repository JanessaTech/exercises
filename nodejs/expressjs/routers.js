var express = require('Express');
var app = express();

var things = require('./things.js');

//both index.js and things.js should be in same directory
app.use('/things', things);

app.listen(3000);
// visit: http://localhost:3000/things
// visit: http://localhost:3000/things/123