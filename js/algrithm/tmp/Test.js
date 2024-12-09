function isLetter(ch) {
    //return (ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z')
    return ch.toUpperCase() != ch.toLowerCase()
}

const ch = 'a'
const res = isLetter(ch)
console.log(res)