const {invalidRequestError} = require('../helpers/errors/errorClasses')
const codes = require('../helpers/errors/errorCodes')
const logger = require('../helpers/logger')

const middlewares = {
    requestValidate : (schema) => {
        return (req, res, next) => {
            try {
                schema.validateSync({body: req.body, params: req.params, query: req.query}, {abortEarly:false, stripUnknown:true})
                next()
            } catch (e){
                const error = new invalidRequestError(codes.INVALID_REQUEST, e.errors)
                next(error)
            }
        }
    },
    authenticate : () => {
        return (req, res, next) => {
            logger.info('authentication')
            next()
        }
    }
}

module.exports = middlewares