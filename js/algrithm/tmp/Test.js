function isNumber(ch) {
    return ch >= '0' && ch <= '9'
}
function isLetter(ch) {
    return ch.toUpperCase() !== ch.toLowerCase()
}
const ch = ''
console.log('isNumber:', isNumber(ch))
console.log('isLetter', isLetter(ch))

 
