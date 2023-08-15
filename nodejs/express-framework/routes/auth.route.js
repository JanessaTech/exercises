const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const {loginSchema} = require('../helpers/validation/shemas')
const {requestValidate} = require('../middlewares/middleware')


router.post('/login', requestValidate(loginSchema), authController.login)
router.post('/register', authController.register)

module.exports = router