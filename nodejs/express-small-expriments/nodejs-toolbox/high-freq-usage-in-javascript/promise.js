
function getPromise(n) {
    return new Promise(function (resolve, reject) {
        if (n >= 0) {
            resolve('number is equal or greater than 0')
        } else {
            reject('number is less than 0')
        }
    })
}

//const myPromise = getPromise(-1)
const myPromise = getPromise(-1)

myPromise.then(
    function (value) {
        console.log(value)
    },
    function (error) {
        console.log(error)
    }
)