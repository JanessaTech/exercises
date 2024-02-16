function  test1() {
    function isJson(obj) {
        return obj !== undefined && obj !== null && obj.constructor === Object;
    }
    const args = [ 1, [2, 3], true, 'sss', null, undefined, { name: 'John' }, 'aaa', new Error('xxxxxx')]
    const res = args.map( e => isJson(e) ? '\n' + JSON.stringify(e, null, 4) + '\n' : e).join(' ')
    console.log(res)
    args.forEach(e => console.log(isJson(e)))
    args.forEach(e => console.log(e ? e.constructor : e))
}

test1()