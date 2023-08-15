
const errorClasses = {
    UserError : class UserError extends Error {
        constructor(type) {
            super(type.message)
            this.code = type.code
        }
    },
    InvalidRequest: class InvalidRequest extends Error {
        constructor(type, errors) {
            super(type.message)
            this.code = type.code
            this.errors = errors
        }
    },
    DefaultError: class DefaultError extends Error {
        constructor(type) {
            super(type.message)
            this.code = type.code
        }
    }

}

module.exports = errorClasses