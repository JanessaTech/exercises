const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const initRoutes = require('./routes')
const initExceptionHandlers = require('./helpers/exceptionHandlers')
const createError = require('http-errors')
const {NOT_FOUND} = require('./helpers/constants')

console.log('configure 3-party middlewares')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

initRoutes(app)
initExceptionHandlers(app)

//app.use((req, res, next) => next(createError(404, NOT_FOUND)));

module.exports = app

