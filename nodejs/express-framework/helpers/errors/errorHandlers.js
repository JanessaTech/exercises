const errorClass = require('./ErrorClasses')
const response = require('../reponseHandler')
module.exports = (app) => {
    console.log('config exception handlers')
    function handleUserNotfoundError() {
        return (error, req, res, next) => {
            if (error instanceof errorClass.UserError) {
                response.error(res, error.message, error.code)
            } else {
                return next(error)
            }
        }
    }

    function handleDefaultError() {
        return (error, req, res, next) => {
            response.error(res, error.message, 500)
        }
    }

    app.use(handleUserNotfoundError())
    app.use(handleDefaultError())
}