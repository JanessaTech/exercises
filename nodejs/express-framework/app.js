const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const initRoutes = require('./routes')
const initGlobalErrorHandlers = require('./helpers/errors/globleErrorHandlers')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

initRoutes(app)
initGlobalErrorHandlers(app)

module.exports = app

