
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

    function isSet(obj){
        return !!obj && obj.constructor === Set;
    }
    function convert(obj) {
        if (isJson(obj)) {
           return  '\n' + JSON.stringify(obj, null, 4)
        }
        if (isArray(obj)) {
            return obj.map((o) => convert(o))
        }
        if (isSet(obj)) {
            return [...obj].map((o) => convert(o))
        }
        return obj
    }
    const args = [ 1, [2, 3], true, 'sss', null, undefined, { name: 'John' }, [{ name: 'aaa' }, { name: 'bbb' }], 'aaa', new CustomError('xxxxxx'), new Set(['jane', 'vvv'])]
    //const res = args.map( e => isJson(e) ? '\n' + JSON.stringify(e, null, 4) + '\n' : e).join(' ')
    const res = args.map( e => convert(e)).join(' ')
    console.log(res)
    args.forEach(e => console.log(isJson(e)))
    args.forEach(e => console.log(e ? e.constructor : e))
}

function  mapToString(map) {
    let map_array = Object.fromEntries(map)
    return JSON.stringify(map_array)
}

function stringToMap() {
    let jsonString = '{"1":"aaaa","2":"bbbb","3":"cccc","4":"dddd"}'
    let obj = JSON.parse(jsonString)
    for (const [key, value] of Object.entries(obj)) {
        
    }
}

function test2() {
    const token_uri_mapping = new Map()
    token_uri_mapping.set(1, 'aaaa')
    token_uri_mapping.set(2, 'bbbb')
    token_uri_mapping.set(3, 'cccc')
    token_uri_mapping.set(4, 'dddd')
    let jsonString = mapToString(token_uri_mapping)
    console.log('jsonString:', jsonString)
}

test1()
//test2()