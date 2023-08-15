class UserError extends Error {
    constructor(type) {
        super(type.message)
        this.code = type.code
    }
}
class InvalidRequest extends Error {
    constructor(type, errors) {
        super(type.message)
        this.code = type.code
        this.errors = errors
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
    DefaultError : DefaultError,
    InvalidRequest : InvalidRequest
}