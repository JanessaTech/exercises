const codes = require("../helpers/errors/ErrorCodes");
const {UserError, DefaultError} = require('../helpers/errors/ErrorClasses')
class AuthService {
    async login(param) {
        console.log('AuthService.login...')
        if (param.name === 'janessa') {
            return {name : param.name}
        } else if (param.name === 'janessa1') {
            throw new UserError(codes.USER_NOT_FOUND)
        } else {
            throw new DefaultError(codes.DEFAULT_ERROR)
        }
    }
    async register(param) {
        console.log('AuthService.register...')
        return {name : param.name}
    }
}

const authService = new AuthService()
module.exports = authService