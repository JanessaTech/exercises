const errorClass = require('./errorClasses')
const {sendError} = require('../reponseHandler')
module.exports = (app) => {
    function handleUserNotfoundError() {
        return (error, req, res, next) => {
            if (error instanceof errorClass.userError) {
                sendError(res, error.message, error.code)
            } else {
                return next(error)
            }
        }
    }

    function handleInvalidRequest() {
        return (error, req, res, next) => {
            if (error instanceof errorClass.invalidRequestError) {
                sendError(res, error.message, error.code, error.errors)
            } else {
                return next(error)
            }
        }
    }

    function handleDefaultError() {
        return (error, req, res, next) => {
            sendError(res, error.message, 500)
        }
    }

    app.use(handleUserNotfoundError())
    app.use(handleInvalidRequest())
    app.use(handleDefaultError())
}