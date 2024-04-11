

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

    myPromise.then( (value) => {
            console.log('in then of success part')
            console.log(value)
        }, (error) => {
            console.log('in then of error part')
            console.log(error)
            //throw new Error(error)  //this  will never be hit if comment out this line
        }
    ).catch((e) => {
        console.log('in catch')
        console.log(e.message)
    })
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

    let myPromise = getPromise(n)

    myPromise.then((value) => {
            if (value !== 'janessa') {
                throw new Error('throw error from promise when value != janessa')
            } else {
                console.log('res is:' + value)
            }
        }, (error) => {
            // notice this part will never be hit because we throw error at the end
            console.log('throw error from the second function in promise')
            throw error  // guess what happens if we comment out this line?
        }
    ).catch( (e) => {
        console.log(e.message)
        console.log('throw error from catch in promise')
    })
}

//basic_usage_promise()
throwErrorInPromise(3)
//throwErrorInPromise(-1)