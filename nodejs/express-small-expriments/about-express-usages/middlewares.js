const express = require('express')

const authClientToken = (req,res,next) => {
    console.log("Verify token in middleware")
    next()
}

module.exports = {
    authClientToken : authClientToken
}

