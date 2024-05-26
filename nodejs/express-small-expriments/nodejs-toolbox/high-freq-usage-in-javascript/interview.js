function test() {
    function getPromise(n) {
        return new Promise(function (resolve, reject) {
            if (n > 0) {
                resolve('ok')
            } else {
                reject(new Error('bad'))
            }
        })
    }

    getPromise(1)
        .then((res) => {
            console.log(res)
        })
        .catch((e) => {
            console.log(e)
        })
}

test()

class Database {
    async getData() {
        return {}
    }
    async processData(data) {
        data.a = "test"
        data.b = 1111
    }

    async saveData(data) {
        console.log('finished')
    }
}

async function update() {
    const db= new Database()
    try {
        const data = await db.getData()
        await db.processData(data)
        await db.saveData(data)
    } catch (e) {
        console.log(e)
    }
}

//update().catch(() =>{})

let z = 4153000000000000000 + 99
console.log(z)
console.log(Number.MAX_SAFE_INTEGER)


