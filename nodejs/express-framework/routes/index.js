const authRouter = require('./auth.route')
const userRouter = require('./user.route')
const routes = app => {
    const apiPrefix = '/apis/v1';
    app.use(apiPrefix + '/auth', authRouter)
    //app.use(apiPrefix + '/users', userRouter)
}
module.exports = routes