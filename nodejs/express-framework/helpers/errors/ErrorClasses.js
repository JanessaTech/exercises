class UserError extends Error {
    constructor(type) {
        super(type.message)
        this.code = type.code
    }
}

class DefaultError extends Error {
    constructor(type) {
        super(type.message)
        this.code = type.code
    }
}

module.exports = {
    UserError : UserError,
    DefaultError : DefaultError
}