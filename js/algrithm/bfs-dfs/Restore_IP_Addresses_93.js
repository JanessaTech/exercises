/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
    const ans = []
    if (s.length < 4) return ans
    const nums = s.split('').map((v) => parseInt(v))

    const isValid = function(sub) {
        if (sub.length === 0) return false
        if (sub.length > 3) return false
        if (sub.length > 1 && sub[0] === 0) return false
        var sum = 0
        for (let i = 0; i < sub.length; i++) {
            sum = sum * 10 + sub[i]
        }
        if (sum > 255) return false
        return true
    }

    const dfs = function(start, seps) {
        if (seps.length === 3) {
            const part1 = nums.slice(0, seps[0])
            const part2 = nums.slice(seps[0], seps[1])
            const part3 = nums.slice(seps[1], seps[2])
            const part4 = nums.slice(seps[2])

            const res = part1.join('') + '.' + part2.join('') + '.' + part3.join('') + '.' + part4.join('')
            ans.push(res)

        } else {
            for (let i = start; i <= nums.length - 1; i++) {
                const part1 = nums.slice(start, i)
                const part2 = nums.slice(i)
                const valid1 = isValid(part1)
                if (seps.length === 2) {
                    const valid2 = isValid(part2)
                    if (valid1 && valid2) {
                        seps.push(i)
                        dfs(i, seps)
                        seps.pop()
                    }
                } else {
                    // <2
                    if (valid1) {
                        seps.push(i)
                        dfs(i, seps)
                        seps.pop()
                    }
                }
            }
        }
    }

    dfs(0, [])
    return ans
};

const s = "101023"
const res = restoreIpAddresses(s)
console.log(res)