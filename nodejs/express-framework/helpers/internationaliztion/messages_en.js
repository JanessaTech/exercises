const {JsonWebTokenError, TokenExpiredError} = require("jsonwebtoken");
module.exports = {
    account_login : 'Account {0} logined successfully(en)',
    account_register: 'Account {0} is registered successfully',
    account_login_wrong_password: 'login with wrong password',
    account_not_found: 'account {0} is not found',
    account_getAll: 'Get all accounts successfully',
    account_getById : 'Get account by id {0} successfully',
    account_update : 'Account {0} is updated successfully',
    account_deleteById : 'Account {0} is deleted successfully',


    // global
    UnSupportedAuthError : 'We only support Bearer token in Authorization',
    ValidationError: 'Request includes invalid parameter(s)',
    JsonWebTokenError: 'Invalid token',
    TokenExpiredError: 'Token expired',
    Error: 'Internal server error'
}