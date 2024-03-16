function test1() {
    const name = 'jane'
    const age = 10
    const stu = {name, age}
    console.log('name = ', stu.name)
    console.log('age = ', stu.age)
}

function test2() {
    const obj = {name: 'Jane', age: 12}
    for (const [key, value] of Object.entries(obj)) {
        console.log('key =', key, ' value =', value)
    }
}
//test1()
test2()