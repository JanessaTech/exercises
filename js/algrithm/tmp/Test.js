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

const sub = [1, 0]
const res = isValid(sub)
console.log('res = ', res)

console.log([0, 1, 2].slice(3))

const s = '25525511135'
const nums = s.split('').map((v) => parseInt(v))
const seps = [3, 6, 8]
const part1 = nums.slice(0, seps[0])
const part2 = nums.slice(seps[0], seps[1])
const part3 = nums.slice(seps[1], seps[2])
const part4 = nums.slice(seps[2])
console.log('part1 = ', part1)
console.log('part2 = ', part2)
console.log('part3 = ', part3)
console.log('part4 = ', part4)
 
