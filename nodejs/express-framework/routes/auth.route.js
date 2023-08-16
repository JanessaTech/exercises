const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const schemas = require('../helpers/validation/shemas')
const {requestValidate, authenticate} = require('../middlewares')


router.post('/login', requestValidate(schemas.loginSchema), authController.login)
router.post('/register', requestValidate(schemas.registerSchema), authController.register)
router.get('/users', authController.getAllUsers)
router.get('/users/:id', requestValidate(schemas.getByUserIdSchema), authController.getUserById)
router.put('/users', requestValidate(schemas.updateUserSchema), authController.updateUser)
router.delete('/users/:id', requestValidate(schemas.deleteUserSchema), authController.deleteUserById)

module.exports = router