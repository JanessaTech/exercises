const {data} =  require('./data')



function  test1() {

    const res = data.find(e => e.id === 1)
    res.age=20
    console.log(res)
    console.log(data)
    console.log(!![])
}

function test2() {
    const arr = [1, 2, 3, 4, 5, 6]
    arr.push(7)
    console.log(arr.toString())
}

test2()