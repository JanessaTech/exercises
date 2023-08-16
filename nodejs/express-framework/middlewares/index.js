const {invalidRequestError} = require('../helpers/errors/errorClasses')
const codes = require('../helpers/errors/errorCodes');

const middlewares = {
    requestValidate : (schema) => {
        return (req, res, next) => {
            try {
                schema.validateSync({body: req.body}, {abortEarly:false, stripUnknown:true})
                next()
            } catch (e){
                const error = new invalidRequestError(codes.INVALID_REQUEST, e.errors)
                next(error)
            }
        }
    }
}

module.exports = middlewares