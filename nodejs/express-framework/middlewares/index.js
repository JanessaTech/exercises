const logger = require('../helpers/logger')
const jwt = require("jsonwebtoken")
const globalErrors = require('../helpers/errors/globalErrors')

const middlewares = {
    validate : (schema) => {
        return (req, res, next) => {
            try {
                schema.validateSync({body: req.body, params: req.params, query: req.query}, {abortEarly:false, stripUnknown:true})
                next()
            } catch (e){
                next(e)
            }
        }
    },
    authenticate :() => {
        return (req, res, next) => {
            logger.debug('authentication...')
            if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') { // Bearer
                jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, function (err, decode) {
                    if (err) {
                        next(err)
                    } else {
                        next()
                    }
                })
            } else {
                const error = new globalErrors.UnSupportedAuthError()
                next(error)
            }
        }
    },
    authorize : () => {
        return (req, res, next) => {
            logger.debug('authorization...')
        }
    }
}

module.exports = middlewares