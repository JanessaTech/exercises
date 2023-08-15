const yup = require("yup")

const schemas = {
    loginSchema : yup.object({
        body: yup.object({
            name : yup.string().min(5).max(15).required(),
            password: yup.string().min(5).max(10).required(),
            email: yup.string().email().optional()
        })
    })
}

module.exports = schemas