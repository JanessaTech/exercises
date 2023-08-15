module.exports = class Response {
    static success(res, message, data = undefined, code = 200) {
        res.status(code).json({
            success: true,
            code: code,
            message: message,
            data : data
        })
    }

    static error(res, message, code = 500) {
        res.status(code).json({
            success: false,
            code: code,
            message: message,
        })
    }
}