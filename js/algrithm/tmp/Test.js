const isPalindrome = function(sub) {
    for (let i = 0, j = sub.length - 1; i <= j; i++, j--) {
        if (sub[i] !== sub[j]) return false
    }
    return true
}

const sub = []
const res = isPalindrome(sub)
console.log('res =', res)
 
