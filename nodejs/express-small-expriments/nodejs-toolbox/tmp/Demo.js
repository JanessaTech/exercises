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

class CustomError extends Error {
    constructor(props) {
        super();
        this.message = 'vvvvvvvvvvvv'
    }
}

function  test3() {
    function isJson(obj) {
        return obj !== undefined && obj !== null && obj.constructor === Object;
    }
    const args = [ 1, [2, 3], true, 'sss', null, undefined, { name: 'John' }, 'aaa', new CustomError('xxxxxx')]
    const res = args.map( e => isJson(e) ? '\n' + JSON.stringify(e, null, 4) + '\n' : e).join(' ')
    console.log(res)
    args.forEach(e => console.log(isJson(e)))
    args.forEach(e => console.log(e ? e.constructor : e))
}
//test2()
test3()
