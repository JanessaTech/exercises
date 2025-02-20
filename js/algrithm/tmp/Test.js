var decodeString = function(s) {
  const isNumber = function(ch) {
      return ch >= '0' && ch < '9'
  }
  let curStr = '', curNum = 0
  const stack = []
  for (let i = 0; i < s.length; i++) {
      const ch = s[i]
      if (ch === '[') {
          stack.push(curNum)
          stack.push(curStr)
          curStr = ''
          curNum = 0
      } else if (isNumber(ch)) {
          curNum = curNum * 10 + parseInt(ch)
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