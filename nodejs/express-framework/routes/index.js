const errorBuilder = require('../helpers/ErrorBuilder')
const exceptions = require('../helpers/Exceptions')
const routes = app => {
    app.get('/:id', function (req, res, next) {
        const id = parseInt(req.params.id)
        if (id === 1) {
            res.status(200).json({
                success: true,
                code: 200,
                message: 'ok'
            })
        } else if (id === 2){
            const err = errorBuilder(exceptions.USER_NOT_FOUND)
            next(err)
        } else {
            const err = errorBuilder(exceptions.DEFAULT_ERROR)
            next(err)
        }

    })
}
module.exports = routes