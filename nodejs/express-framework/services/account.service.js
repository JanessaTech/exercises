const bcrypt = require('bcrypt')
const logger = require('../helpers/logger')
const {AccountError} = require("../routes/account/AccountErrors");
class AccountService {
    accountMap = new Map()
    cnt = 0
    async login(param) {
        logger.info('AccountService.login...')
        let users = this.findAccount(param.name)
        if (users.length !== 0) {
            if (bcrypt.compareSync(param.password,users[0].password)) {
                return users[0]
            } else {
                throw new AccountError({key: 'account_login_wrong_password'})

            }
        } else {
            throw new AccountError({key: 'account_not_found', params:[param.name]})
        }
    }

    findAccount(name) {
        return Array.from(this.accountMap.values()).filter(value => value.name === name)
    }
    async register(param) {
        logger.info('AccountService.register...')
        param.id = this.cnt.toString()
        this.accountMap.set(this.cnt.toString(), param)
        this.cnt++
        return param

    }

    async getAllAccounts() {
        return Object.fromEntries(this.accountMap)
    }

    async getAccountById(id) {
        if (this.accountMap.has(id)) {
            return this.accountMap.get(id)
        } else {
            throw new AccountError({key: 'account_not_found', params:[id]})
        }
    }

    getAccountByIdInSyn(id) {
        if (this.accountMap.has(id)) {
            return this.accountMap.get(id)
        } else {
            throw new AccountError({key: 'account_not_found', params:[id]})
        }
    }
    async updateAccount(param) {
        if (this.accountMap.has(param.id)) {
            this.accountMap.set(param.id, param)
            return param
        } else {
            throw new AccountError({key: 'account_not_found', params:[param.name]})
        }
    }

    async deleteAccountById(id) {
        if (this.accountMap.has(id)) {
            this.accountMap.delete(id)
        } else {
            throw new AccountError({key: 'account_not_found', params:[id]})
        }
    }
}

const accountService = new AccountService()
module.exports = accountService