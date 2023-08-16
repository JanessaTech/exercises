
const errorClasses = {
    userError : class UserError extends Error {
        constructor(type) {
            super(type.message)
            this.code = type.code
        }
    },
    invalidRequestError: class InvalidRequest extends Error {
        constructor(type, errors) {
            super(type.message)
            this.code = type.code
            this.errors = errors
        }
    },
    defaultError: class DefaultError extends Error {
        constructor(type) {
            super(type.message)
            this.code = type.code
        }
    }

}

module.exports = errorClasses