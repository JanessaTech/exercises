
class CustomError extends Error {
    constructor(props) {
        super();
        this.message = 'vvvvvvvvvvvv'
    }
}
function  test1() {
    function isJson(obj) {
        return obj !== undefined && obj !== null && obj.constructor === Object;
    }

    function isArray(obj){
        return !!obj && obj.constructor === Array;
    }
    function convert(obj) {
        if (isJson(obj)) {
           return  '\n' + JSON.stringify(obj, null, 4)
        }
        if (isArray(obj)) {
            return obj.map((o) => convert(o))
        }
        return obj
    }
    const args = [ 1, [2, 3], true, 'sss', null, undefined, { name: 'John' }, [{ name: 'aaa' }, { name: 'bbb' }], 'aaa', new CustomError('xxxxxx')]
    //const res = args.map( e => isJson(e) ? '\n' + JSON.stringify(e, null, 4) + '\n' : e).join(' ')
    const res = args.map( e => convert(e)).join(' ')
    console.log(res)
    args.forEach(e => console.log(isJson(e)))
    args.forEach(e => console.log(e ? e.constructor : e))
}

function test_emptyJson() {
    
}

test1()