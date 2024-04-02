


class FnMap {
    #fnMap = new Map()
    constructor() {
        this.#init()
    }

    #init() {
        this.#fnMap.set('stu', (name, age, list) => {
            console.log('name =', name)
            console.log('age =', age)
            console.log('list =', list)
        })
    }
    call(key, ...params) {
        if (this.#fnMap.get(key)) {
            const fn = this.#fnMap.get(key)
            if (params && params.length > 0) {
                fn(...params)
            } else {
                console.log('params = ', undefined)
            }
        }
    }
}
function fn(name, age, list) {
    console.log('name =', name)
    console.log('age =', age)
    console.log('list =', list)
}

function test1() {
    const fnMap = new FnMap()
    //fnMap.call('stu')
    fnMap.call('stu', 'janessa', 11, [1, 2, 3])

}
test1()