const express = require('express')
const middlewares = require('./middlewares')
const router = express.Router()

function getAllUser(req,res,next) {
    console.log("getAllUser")
    return res.status(200).json({
        "success" : {
            "msg" : "getAllUser"
        }
    })
}
function getUserById(req, res, next) {
    console.log("getUserById: " + req.params.id)
    return res.status(200).json({
        "success" : {
            "msg" : "getUserById " + req.params.id
        }
    })
}

router.get('/', middlewares.authClientToken, getAllUser)
router.get('/:id', middlewares.authClientToken, getUserById)

module.exports = router