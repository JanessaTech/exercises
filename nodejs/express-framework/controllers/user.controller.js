const userService = require('../services/user.service')
const logger = require('../helpers/logger')
const {sendSuccess} = require('../helpers/reponseHandler')
const messageHelper = require('../helpers/internationaliztion/messageHelper')
class UserController {
    async getAllUsers(req, res, next) {
        logger.info('getAllUsers')
        try {
            let payload = await userService.getAllUsers()
            sendSuccess(res, messageHelper.getMessage('getAllUser'), payload)
        } catch (e) {
            next(e)
        }
    }

    async getUserById(req, res, next) {
        logger.info('getUserById:' + req.params.id)
        try {
            let payload = await userService.getUserById(req.params.id)
            sendSuccess(res, messageHelper.getMessage('getUserById', req.params.id), payload)
        } catch (e) {
            next(e)
        }
    }

    async createUser(req, res, next) {
        logger.info('createUser')
        try {
            let payload = await userService.createUser(req.body)
            sendSuccess(res, messageHelper.getMessage('createUser', payload.name))
        } catch (e) {
            next(e)
        }
    }

    async updateUser(req, res, next) {
        logger.info('updateUser')
        try {
            let payload = await userService.updateUser(req.body)
            sendSuccess(res, messageHelper.getMessage('updateUser', payload.name))
        } catch (e) {
            next(e)
        }
    }

    async deleteUserById(req, res, next) {
        logger.info('deleteUserById:' + req.params.id)
        try {
            await userService.deleteUserById(req.params.id)

        } catch (e) {
             next(e)
        }
    }
}

const controller = new UserController()
module.exports = controller