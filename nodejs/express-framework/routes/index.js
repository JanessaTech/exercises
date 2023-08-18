const accountRouter = require('./account')
const apiPrefix = require('../config').apiPrefix
const routes = app => {
    app.use(apiPrefix + '/accounts', accountRouter)
}
module.exports = routes