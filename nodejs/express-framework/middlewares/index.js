const logger = require('../helpers/logger')
const jwt = require("jsonwebtoken")
const globalErrors = require('../helpers/errors/globalErrors')
const urls = require('../config/urls')
const urlHelper = require('../helpers/urlHelper')

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
                        let user = {
                            name : decode.name,
                            roles : decode.roles,
                            email: decode.email
                        }
                        res.locals.authenticated = true
                        res.locals.user = user
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
            logger.debug('res.locals.authenticated : ' + res.locals.authenticated)
            logger.debug('req.originalUrl:' + req.originalUrl)
            logger.debug('res.locals.user:' + res.locals.user)
            let user = res.locals.user
            let authenticated = res.locals.authenticated
            let allowedPermissions = urlHelper.getRoles(req.originalUrl)
            let isAllowed = user.roles.some(r => allowedPermissions.includes(r))
            if (authenticated && isAllowed) {
                next()
            } else {
                let error = new globalErrors.UnauthorizedError({params: [req.originalUrl]})
                next(error)
            }

            next()
        }
    }
}

module.exports = middlewares