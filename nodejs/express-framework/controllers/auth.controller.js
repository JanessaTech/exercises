const authService = require('../services/auth.service')
const Response = require('../helpers/reponseHandler')
const logger = require('../helpers/logger')
const messageHelper = require('../helpers/internationaliztion/messageHelper')

class AuthController {
    async login(req, res, next) {
        logger.info('in login method ...')
        try {
            let payload = await authService.login(req.body)
            logger.info(JSON.stringify(payload))  // to-do: check where to configure so that winston could print json directly
            let message = messageHelper.getMessage('login_success', payload.name)
            Response.success(res, message, payload)
        } catch (e){
            next(e)
        }
    }
    async register(req, res, next){
        console.log('in register method ...')
        console.log(req.body)
        try {
            let re = await authService.register()
            res.status(200).json({
                success: true,
                code: 200,
                message: `${re.name} is registered successfully`,
                data : re
            })
        } catch (e) {
            next(e)
        }
    }
}

const controller = new AuthController()
module.exports = controller