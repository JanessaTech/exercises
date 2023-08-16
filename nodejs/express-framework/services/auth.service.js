const codes = require("../helpers/errors/errorCodes");
const {userError, defaultError} = require('../helpers/errors/errorClasses')
class AuthService {
    async login(param) {
        console.log('AuthService.login...')
        if (param.name === 'janessa') {
            return {name : param.name}
        } else if (param.name === 'janessa1') {
            throw new userError(codes.USER_NOT_FOUND)
        } else {
            throw new defaultError(codes.DEFAULT_ERROR)
        }
    }
    async register(param) {
        console.log('AuthService.register...')
        return {name : param.name}
    }
}

const authService = new AuthService()
module.exports = authService