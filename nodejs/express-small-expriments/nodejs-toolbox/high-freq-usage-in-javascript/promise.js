

function basic_usage_promise() {
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
}


function throwErrorInPromise(n) {
    function getPromise(n) {
        return new Promise(function (resolve, reject) {
            if (n >= 5) {
                resolve('janessa')
            } else if(n >= 0 && n < 5){
                resolve('hello')
            } else { // n < 0
                reject(new Error('number is less than 0'))
            }
        })
    }

    let myPromise = getPromise(3)
    let myerror = undefined
    myPromise.then(
        function (value) {
            if (value !== 'janessa') {
                throw new Error('throw error from promise when value = janessa')
            } else {
                console.log('res is:' + value)
            }
        },
        function (error) {
            console.log('throw error from the second function in promise')
            throw error
        }
    ).catch(function (e) {
        console.log('throw error from catch in promise')
        myerror = e

    })

    if (myerror) {
        // the info cannot be printed out, we cannot use this way to set variable
        console.log('println error here')
        console.log(myerror.message)
    }

}


throwErrorInPromise(3)