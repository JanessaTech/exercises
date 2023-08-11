const express  = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//const expressValidator = require('express-validator')
const session = require('express-session')
const apiRoute = require('./apis')

var app = express()
app.set('env_variable', 'This is the value set by env_variable')
let env_variable = app.get('env_variable')
console.log('env_variable:' + env_variable)

// add middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser())
app.use(session({secret: 'Shh, its a secret!'}))

app.get('*', function (req, res, next) {
    console.log('Request was made to: ' + req.originalUrl);
    return next();
});// every request will go through it

app.use('/apis', apiRoute)
app.listen(8080, () =>{
    console.log('call back fun when start app at 8080 port')
})
