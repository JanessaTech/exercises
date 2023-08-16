const codes = require("../helpers/errors/errorCodes");
const {userError, defaultError} = require('../helpers/errors/errorClasses')
class UserService {
    userMap = new Map()
    cnt = 0
    async getAllUsers() {
        return Object.fromEntries(this.userMap)
    }

    async getUserById(id) {
        if (this.userMap.has(id)) {
            let value = this.userMap.get(id)
            value.id = id
            return value
        } else {
            throw new userError(codes.USER_NOT_FOUND)
        }
    }

    async createUser(param) {
        this.userMap.set(this.cnt++, param)
        param.id = this.cnt
        return param
    }

    async updateUser(param) {
        if (this.userMap.has(param.id)) {
            this.userMap.set(param.id, param)
            return param
        } else {
            throw new userError(codes.USER_NOT_FOUND)
        }
    }

    async deleteUserById(id) {
        if (this.userMap.has(id)) {
            this.userMap.delete(id)
        } else {
            throw new userError(codes.USER_NOT_FOUND)
        }
    }
}

const userService = new UserService()
module.exports = userService