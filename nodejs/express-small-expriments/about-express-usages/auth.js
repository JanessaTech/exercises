const express = require('express')
const middlewares = require('./middlewares')
const router = express.Router()

function login(req, res, next) {
    console.log("login")
    return res.status(200).json({
        "success" : {
            "msg" : "login"
        }
    })
}

router.get('/login',middlewares.authClientToken, login)

module.exports = router