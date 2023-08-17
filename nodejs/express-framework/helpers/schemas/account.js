const yup = require('yup')

const schemas = {
    loginSchema : yup.object({
        body: yup.object({
            name : yup.string().min(5).max(15).required(),
            password: yup.string().min(5).max(10).required()
        })
    }),
    registerSchema : yup.object({
        body: yup.object({
            name : yup.string().min(5).max(15).required(),
            password: yup.string().min(5).max(10).required(),
            email: yup.string().email().optional()
        })
    }),
    updateUserSchema : yup.object({
        body: yup.object({
            id : yup.number().required(),
            name : yup.string().min(5).max(15).required(),
            password: yup.string().min(5).max(10).optional(),
            email: yup.string().email().optional()
        })
    }),
    deleteUserSchema :yup.object({
        params: yup.object({
            id : yup.number().required()
        })
    }),
    getByUserIdSchema :yup.object({
        params: yup.object({
            id : yup.number().required()
        })
    })
}

module.exports = schemas