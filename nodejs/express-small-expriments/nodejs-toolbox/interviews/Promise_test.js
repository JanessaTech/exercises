

function test() {
    function getPromise(n) {
        return new Promise(function (resolve, reject) {
            if (n > 0) {
                resolve('ok')
            } else {
                reject('err')
            }
        })
    }
    getPromise(-1).then((res) => {
       console.log(res)
    }).catch((e) => {
        console.log(e)
    })
}

test()

function test2() {
    const map = new Map([[1, 'aaa'], [2, 'bbb'], [3, 'ccc']])
    // for (const [k, v] of map) {
    //     console.log('key = ', k, ' value =', v)
    // }
    map.forEach((v, k) => {
        console.log('key = ', k, ' value = ', v)
    })
}
test2()