const accountRouter = require('./account')
const routes = app => {
    const apiPrefix = '/apis/v1';
    app.use(apiPrefix + '/accounts', accountRouter)
}
module.exports = routes