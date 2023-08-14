const createError = require("http-errors");
const exceptions = require('./Exceptions')
module.exports = (app) => {
    console.log('config exception handlers')
    function handleUserNotfoundError() {
        return (error, req, res, next) => {
            const type = error.type
            if (type === exceptions.USER_NOT_FOUND) {
                res.status(error.code).json({
                    success: false,
                    code: error.code,
                    message: error.message
                })
            } else {
                return next(error)
            }
        }
    }

    function handleDefaultError() {
        return (error, req, res, next) => {
            res.status(error.code).json({
                success: false,
                code: error.code,
                message: error.message
            })
        }
    }

    app.use(handleUserNotfoundError())
    app.use(handleDefaultError())
}