
function case1() {
    function resolveAfter2Seconds() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(123);
            }, 2000);
        });
    }

    async function asyncCall() {
        console.log('calling');
        const result = await resolveAfter2Seconds();  // await is only used in function with async
        console.log(result + '   ' + typeof result);
        // Expected output: "resolved"
    }
}

function case2() {
    function getPromise(n) {
        return new Promise(function (resolve, reject) {
            if (n >= 0) {
                resolve('number is equal or greater than 0')
            } else {
                reject(new Error('number is less than 0'))
            }
        })
    }

    async function showResult(n) {
        try{
            const res = await getPromise(n)
            console.log('res type:' + typeof res + "  res=" + res)
        }catch (e) {
            console.log(e.name)
            console.log(e.message)
        }

    }
    showResult(1)
    //showResult(-1)
}

function case3(n) {
    function inner(n) {
        return new Promise(function (resolve, reject) {
            if (n >= 0) {
                resolve('ok')
            } else {
                reject(new Error('less than 0 in inner'))
            }
        })
    }

    async function caller(n) {
        try {
            let res = await inner(n)
            console.log(res + '  in caller')
            return res
        }catch(e) {
            console.log(e.name)
            console.log(e.message)
            throw new Error(e.message + ' in caller')
        }
    }

    async function outside(n) {
        try {
            let res = await caller(n)
            console.log(res + '  in outside')
        } catch (e) {
            console.log(e.name)
            console.log(e.message)
        }
    }
    outside(n)
}

function case4(n) {
    async function inner(n) {
        if (n >= 0) return 'ok'
        throw new Error('number is less than 0')
    }

    async function caller(n) {
        try {
            let res = await inner(n)
            console.log(res + '  in caller')
            return res
        }catch(e) {
            console.log(e.name)
            console.log(e.message)
            throw new Error(e.message + ' in caller')
        }
    }

    async function outside(n) {
        try {
            let res = await caller(n)
            console.log(res + '  in outside')
        } catch (e) {
            console.log(e.name)
            console.log(e.message)
        }
    }
    outside(n)
}

function test5() {
    function resolveAfter5Seconds() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('hello JanessaTech');
            }, 5000);
        }, (reject) => {
            reject(new Error('Hi, wrong!'))
        });
    }

    console.log('start1 ....')
    resolveAfter5Seconds().then((res) => {
        console.log('we hit then. res =', res)
    }).catch((err) => {
        console.log('we hit catch. err =', err)
    })
    console.log('end ...')
}

async function test6() {
    function resolveAfter5Seconds() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('hello JanessaTech');
            }, 5000);
        }, (reject) => {
            reject(new Error('Hi, wrong!'))
        });
    }
    console.log('start1 ....')
    const res = await resolveAfter5Seconds()
    console.log('res =', res)
    console.log('end ...')
}

//case2()
//case3(-1)
//case4(-1)
//test5()
test6()



