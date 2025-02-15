var gcdOfStrings = function(str1, str2) {
    if (str1 + str2 !== str2 + str1) return ''
    const gcdLen  = gcd(str1.length, str2.length)
    return str1.substring(0, gcdLen)
};

function gcd(p, q) {
    if (q === 0) return p
    else return gcd(q, p % q)
}

const str1 = "ABCABC", str2 = "ABC"
const res = gcdOfStrings(str1, str2)
console.log(res)