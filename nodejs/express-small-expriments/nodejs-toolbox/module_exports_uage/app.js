module.exports = function () {
    createFn = (params) => {
        console.log('In createFn...')
        console.log('params : ' + params)
    }
    startFn = () => {
        console.log('In startFn...')
    }
    return {
        create : createFn,
        start: startFn
    }
}