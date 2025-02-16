/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function(s) {
    let ans = ''
    const arr = s.split('')
    const stack  = []
    let curNum = 0, curStr = ''
    const isNumber = function(ch) {
        return ch >= '0' && ch <= '9'
    }
    for (let i = 0; i < s.length; i++) {
        const ch = arr[i]
        if (ch === '[') {
            stack.push(curStr)
            stack.push(curNum)
            curNum = 0
            curStr = ''
        } else if (ch === ']') {
            let num = stack.pop()
            let preStr = stack.pop()
            curStr = preStr + curStr.repeat(num)
        } else if (isNumber(ch)) {
            curNum = curNum * 10 + parseInt(ch)
        } else {
            curStr += ch
        }
    }
    return curStr
};