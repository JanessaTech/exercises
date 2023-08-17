const express = require('express')
const router = express.Router()
const controller = require('../../controllers/account.controller')
const {accountSchema} = require('../../helpers/schemas')
const {validate, authenticate} = require('../../middlewares')
const initAccountErrorHandlers = require('./accountErrorHandlers')

router.post('/login', validate(accountSchema.loginSchema), controller.login)
router.post('/register', validate(accountSchema.registerSchema), controller.register)
router.get('/', authenticate(), controller.getAllAccounts)
router.get('/:id', validate(accountSchema.getByUserIdSchema), controller.getAccountById)
router.put('/', validate(accountSchema.updateUserSchema), controller.updateAccount)
router.delete('/:id', validate(accountSchema.deleteUserSchema), controller.deleteAccountById)

initAccountErrorHandlers(router)

module.exports = router