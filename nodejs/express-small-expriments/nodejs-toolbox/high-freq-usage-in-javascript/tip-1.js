
function bing_console_log() {
    const logger = {}
    const log = console.log.bind(logger)
    log('Hello janessa')
    log(10)
}

function merge_two_array() {
    const arr1 = ['one', 'two', 'three']
    const arr2 = ['four', 'five', 'six']
    const merged = arr1.concat(arr2)
    console.log('merged:  ' + `${merged}`)
    console.log('arr1 : ' + `${arr1}`)
    console.log('arr1 : ' + `${arr2}`)
    /*
    output:
        merged:  one,two,three,four,five,six
        arr1 : one,two,three
        arr1 : four,five,six

     */
}

function merge_two_object() {
    const user = {
        name : 'Janessa',
        gender : 'female'
    }

    const article = {
        title : 'Javascript tips',
        date : '2023-8-13'
    }
    const summary = {...user, ...article}
    console.log(summary)
   /*
   output:
   {
        name: 'Janessa',
            gender: 'female',
        title: 'Javascript tips',
        date: '2023-8-13'
    }*/
}

function shorten_an_array() {
    const big_array = [1, 2,3, 4, 5,6, 7]
    big_array.length = 3
    console.log(big_array)
    /*
    output:
        [ 1, 2, 3 ]
     */
}

function shuffle_an_array() {
    const array = [1, 2, 3, 4, 5, 6, 7]
    array.sort(function () {return Math.random() - 0.5})
    console.log(array)
}

function verify_isNum() {
    function isNum(n) {return !isNaN(parseFloat(n))  && isFinite(n)}
    console.log(isNum(1337))
    console.log(isNum(13.37))
    console.log(isNum('hello world'))
    /*
    output:
        true
        true
        false
     */
}

function verifyStr() {
    const isStr = (str) => typeof str === 'string'
    console.log(isStr('Janessa'))
    console.log(isStr(231))
    console.log(isStr(true))
    /*
    output:
        true
        false
        false
     */
}

function verifyIsNull() {
    const isNull = (value) => value === null || value === undefined
    console.log(isNull(null))  //true
    console.log(isNull())  //true
    console.log(isNull(123))  //false
    console.log(isNull('test'))  //false
    console.log(isNull(true))  //false
}

function removeDuplicatedNumber() {
    const removeDuplipcates = (arr) => [...new Set(arr)]
    console.log(removeDuplipcates([1, 2, 3,4, 1, 2, 3, 4]))

}

function msg_template(...params) {
    const isJson = (obj) => {
        return obj !== undefined && obj !== null && obj.constructor === Object;
    }
    const isArray = (obj) => {
        return !!obj && obj.constructor === Array;
    }

    const convert = (obj) => {
        if (isJson(obj)) {
            return  '\n' + JSON.stringify(obj, null, 4) + '\n'
        }
        if (isArray(obj)) {
            return obj.map((o) => convert(o))
        }
        return obj
    }

    let message =  'value1 = {0}, value2 = {1}, value3 = {2}, value4 = {3}, value5 = {4}, value6={5}'
    const _params = params.map( (e) => convert(e))
    for(let i = 0; i < _params.length; i++) {
        const ph = `{${i}}`
        message = message.replace(ph, _params[i])
    }
    console.log(message); //
}

function convert_str_to_int() {
    const str = '10'
    const res = parseInt(str, 10)
    console.log('type =' + typeof res + "  value =" + res)
}

function  myErrorClassName() {
    class BaseError extends  Error {
        constructor(props) {
            super();
            if (props === undefined) {
                props = {}
            }
            this.key = props && props.key ? props.key : this.constructor.name
            this.errors = props.errors
        }
    }
    class MyError extends BaseError {
        constructor(props) {
            super(props);
        }
    }
    try {
        //throw new MyError('USER_NOT_FOUND',['a', 'b'])
        //throw new MyError({key : 'USER_NOT_FOUND', errors : 'a'})
        //throw new MyError({errors : 'a'})
        //throw new MyError({})
        throw new MyError()
    } catch (e) {
        console.log(e.key)
        console.log(e.errors)
    }
}

function arrayContains() {
    let a = [1, 2, 3]
    let config = [1, 4, 5]
    let exits = config.some(r => a.includes(r))
    console.log(exits)
}

function regex() {
    let str = '/apis/v11/accounts/1'
    let regex = '^/apis/v[0-9]+/accounts.*'
    let res = str.match(regex)
    console.log(res)
}

function regex1() {

    let urls = {
        '^/apis/v[0-9]+/accounts.*' : ['admin']
    }
    function getRoles(originalUrl) {
        for(let prop in urls) {
            let key = prop
            let value = urls[key]
            let matched = originalUrl.match(key)
            if (matched) return value
        }
        return null
    }


    let originalUrl =  '/apis/v1/accounts/'
    let roles = getRoles(originalUrl)
    console.log(roles.join(' '))
}

function isValueOrReference() {
    let myMap = new Map()
    myMap.set(1, {id: 1, name: 'wei', age: 12})
    myMap.set(0, {id: 0, name: 'jane', age: 10})
    myMap.set(3, {id: 3, name: 'jane', age: 13})
    console.log(myMap)
    let user = myMap.get(1)
    user.age = 14
    console.log(myMap)
    myMap.delete(3)
    console.log(myMap)
}


//bing_console_log()
//merge_two_array()
//merge_two_object()
//shorten_an_array()
//shuffle_an_array()
//verify_isNum()
//verifyStr()
//verifyIsNull()
//removeDuplicatedNumber()
//msg_template('sub', ...['hello', 'janessa'])
msg_template('janessa', 'hello', {aa: '123'}, [{bb: '111'}, {cc: '2222'}], null, undefined)
//convert_str_to_int()
//myErrorClassName()
//arrayContains()
//regex()
//regex1()
//isValueOrReference()
