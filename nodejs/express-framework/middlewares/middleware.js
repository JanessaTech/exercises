const {InvalidRequest} = require('../helpers/errors/ErrorClasses')
const codes = require('../helpers/errors/ErrorCodes');

const validator = {
    requestValidate : (schema) => {
        return (req, res, next) => {
            try {
                schema.validateSync({body: req.body}, {abortEarly:false, stripUnknown:true})
                next()
            } catch (e){
                const error = new InvalidRequest(codes.INVALID_REQUEST, e.errors)
                next(error)
            }
        }
    }
}

module.exports = validator