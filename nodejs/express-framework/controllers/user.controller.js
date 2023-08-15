class UserController {
    getAllUsers(req, res, next) {
        console.log('getAllUsers')
        res.status(200).json({
            success: true,
            code: 200,
            message: 'ok'
        })
    }

    getUserById(req, res, next) {
        console.log('getUserById:' + req.params.id)
        res.status(200).json({
            success: true,
            code: 200,
            message: 'ok'
        })
    }

    createUser(req, res, next) {
        console.log('createUser')
        res.status(200).json({
            success: true,
            code: 200,
            message: 'ok'
        })
    }

    updateUser(req, res, next) {
        console.log('updateUser')
        res.status(200).json({
            success: true,
            code: 200,
            message: 'ok'
        })
    }

    deleteUserById(req, res, next) {
        console.log('deleteUserById:' + req.params.id)
        res.status(200).json({
            success: true,
            code: 200,
            message: 'ok'
        })
    }
}

const controller = new UserController()
module.exports = controller