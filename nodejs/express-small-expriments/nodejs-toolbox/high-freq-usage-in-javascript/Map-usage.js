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

test1()