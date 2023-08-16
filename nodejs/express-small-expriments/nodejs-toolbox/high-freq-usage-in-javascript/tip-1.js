
const messages = require('./message_en')
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

function msg_template(key, ...params) {
    let message = messages.sub
    for(let i = 0; i < params.length; i++) {
        const ph = `{${i}}`
        message = message.replace(ph, params[i])
    }
    console.log(message); //
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
msg_template('sub', 'hello', 'janessa')
