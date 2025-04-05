var decodeString = function(s) {
    const stack = []
    let curNum = 0, curStr = ''
    const isNumber = function(ch) {
        return ch >= '0' && ch <= '9'
    }
    for (let ch of s) {
        if (isNumber(ch)) {
            curNum = curNum * 10 + parseInt(ch)
        } else if (ch === '[') {
            stack.push(curNum)
            stack.push(curStr)
            curNum = 0
            curStr = ''
        } else if (ch === ']') {
            const preStr = stack.pop()
            const num = stack.pop()
            curStr = preStr + curStr.repeat(num) 
        } else {
            curStr += ch
        }
    }
    return curStr
};

const s = "3[a]2[bc]"
const res = decodeString(s)
console.log(res)