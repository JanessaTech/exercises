const authService = require('../services/auth.service')
const Response = require('../helpers/reponseHandler')
const logger = require('../helpers/logger')

class AuthController {
    async login(req, res, next) {
        logger.info('in login method ...')
        logger.info(`request body ${req.body}`)
        try {
            let payload = await authService.login(req.body)
            console.log(payload)
            Response.success(res, `${payload.name} login successfully`, payload)
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