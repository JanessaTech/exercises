const express  = require('express')
const bodyParser = require('body-parser');

const routerA = express.Router()
const routerB = express.Router()

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


class ErrorA extends Error {
    constructor(msg) {
        super(msg);
    }
}

class ErrorB extends Error {
    constructor(msg) {
        super(msg);
    }
}

function funA(req, res, next) {
    console.log('In funA ...')
    let name = req.body.name
    if (name === 'funA') {
        res.status(200).json({message: "funA"})
    } else if (name === 'funB') {
        throw new ErrorB('errorB thrown from funA')
    } else {
        throw new ErrorA('errorA thrown from funA')
    }

}

function middlewareA1(req, res, next) {
    console.log('middlewareA1')
    next()
    console.log('middlewareA1 end')
}
function middlewareA2(req, res, next) {
    console.log('middlewareA2')
    next()
    console.log('middlewareA2 end')
}
routerA.get('/testA', middlewareA1, middlewareA2, funA)
routerA.use(errorHandlerA)

function errorHandlerA(error, req, res, next) {
    console.log('errorHandlerA...')
    if (error instanceof ErrorA) {
        res.status(400).json({message : error.message})
    } else {
        next(error)
    }
    console.log('errorHandlerA end...')
}
app.use('/a', routerA)

function funB(req, res, next) {
    console.log('In funB ...')
    let name = req.body.name
    if (name === 'funB') {
        res.status(200).json({message: "funB"})
    } else
        throw new ErrorB('errorB thrown from funB')
}
function errorHandlerB(error, req, res, next) {
    console.log('errorHandlerB...')
    if (error instanceof ErrorB) {
        res.status(400).json({message : error.message})
    } else {
        next(error)
    }
    console.log('errorHandlerB end...')
}
function middlewareB(req, res, next) {
    console.log('middlewareB')
    next()
    console.log('middlewareB end')
}
routerB.get('/testB', middlewareB, funB)
app.use('/b', routerB)
app.use(errorHandlerB)


function globalErrorHanding(error, req, res, next) {
    console.log('globalErrorHanding')
    res.status(400).json({message : error.message})
}
app.use(globalErrorHanding)


app.listen(8080, () =>{
    console.log('call back fun when start app at 8080 port')
})
