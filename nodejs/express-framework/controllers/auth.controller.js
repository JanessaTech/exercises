const authService = require('../services/auth.service')
const {sendSuccess} = require('../helpers/reponseHandler')
const logger = require('../helpers/logger')
const messageHelper = require('../helpers/internationaliztion/messageHelper')
const userService = require("../services/user.service");

class AuthController {
    async login(req, res, next) {
        logger.info('AuthController.login')
        try {
            let payload = await authService.login(req.body)
            logger.info(JSON.stringify(payload))  // to-do: check where to configure so that winston could print json directly
            let message = messageHelper.getMessage('auth_login', payload.name)
            sendSuccess(res, message, payload)
        } catch (e){
            next(e)
        }
    }
    async register(req, res, next){
        logger.info('AuthController.register')
        try {
            let payload = await authService.register(req.body)
            sendSuccess(res, messageHelper.getMessage('auth_register', payload.name))
        } catch (e) {
            next(e)
        }
    }
    async getAllUsers(req, res, next) {
        logger.info('AuthController.getAllUsers')
        try {
            let payload = await authService.getAllUsers()
            sendSuccess(res, messageHelper.getMessage('auth_getAllUsers'), payload)
        } catch (e) {
            next(e)
        }
    }

    async getUserById(req, res, next) {
        logger.info('AuthController.getUserById')
        try {
            let payload = await authService.getUserById(req.params.id)
            sendSuccess(res, messageHelper.getMessage('auth_getUserById', req.params.id), payload)
        }catch (e) {
            next(e)
        }
    }

    async updateUser(req, res, next){
        logger.info('AuthController.updateUser')
        try {
            let payload = await authService.updateUser(req.body)
            sendSuccess(res, messageHelper.getMessage('auth_updateUser', payload.name), payload)
        } catch (e) {
            next(e)
        }
    }

    async deleteUserById(req, res, next){
        logger.info('AuthController.deleteUserById')
        try{
            await authService.deleteUserById(req.params.id)
            sendSuccess(res, messageHelper.getMessage('auth_deleteUserById', req.params.id))
        } catch (e) {
            next(e)
        }
    }
}

const controller = new AuthController()
module.exports = controller