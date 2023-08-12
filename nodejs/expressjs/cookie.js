var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/', function(req, res){
    console.log('Cookies: ', req.cookies);
    res.cookie('name', 'express', {maxAge: 360000}).send('cookie set'); //Sets name = express
});
app.get('/clear_cookie', function(req, res) {
    res.clearCookie('name')
    res.send('cookie foo cleared');
})

app.listen(3000);
// visit: http://localhost:3000/
// http://localhost:3000/clear_cookie