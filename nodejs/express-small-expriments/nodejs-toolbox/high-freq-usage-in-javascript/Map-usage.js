function test1() {
    const myMap = new Map()
    myMap.set(1, 'aaa')
    myMap.set(2, 'bbb')
    myMap.set(3, 'ccc')

    for (const [key, value] of myMap) {
        console.log(`key = ${key}, value = ${value}`)
    }

    for (const [, value] of myMap) {
        console.log(`value = ${value}`)
    }
}

function filter() {
    const rawMap = new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4]])

    const newMap = new Map([...rawMap].filter(([k, v]) => v > 2))
    console.log(newMap)
}

function loop_map() {
    const rawMap = new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4]])
    rawMap.forEach((v, k) => {
        console.log(v)
    })
}

//test1()
//filter()
loop_map()
