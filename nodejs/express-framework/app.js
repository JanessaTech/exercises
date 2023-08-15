const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const initRoutes = require('./routes')
const initExceptionHandlers = require('./helpers/errors/errorHandlers')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

initRoutes(app)
initExceptionHandlers(app)

module.exports = app

