/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {

    const chs = s.split('')
    const ans = []

    const isPalindrome = function(sub) {
        if (sub.length === 0) return false
        for (let i = 0, j = sub.length - 1; i <= j; i++, j--) {
            if (sub[i] !== sub[j]) return false
        }
        return true
    } 

    const dfs = function(start, seps) {
        if (start === s.length) {
            const one = []
            for (let i = 0; i < seps.length; i++) {
                if (i === 0) {
                    const part = chs.slice(0, seps[0])
                    one.push(part.join(''))
                } else {
                    const part = chs.slice(seps[i -1], seps[i])
                    one.push(part.join(''))
                }
            }
            ans.push(one)
        } else {
            for (let i = start; i <= s.length; i++) {
                const part1 = chs.slice(start, i)
                if (isPalindrome(part1)) {
                    seps.push(i)
                    dfs(i, seps)
                    seps.pop()
                }
            }
        }
    }

    dfs(0, [])
    return ans
    
};

const s = "aab"
const res = partition(s)
console.log('res =', res)