const express = require('express')
const router = express.Router()

const userRoute = require('./users')
const authRoute = require('./auth')

router.use('/users',userRoute)
router.use('/auth', authRoute)

module.exports = router