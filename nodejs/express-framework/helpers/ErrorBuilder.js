module.exports = (errorType) => {
    const err = new Error(errorType.message);
    err.code = errorType.code
    err.type = errorType
    return err
}