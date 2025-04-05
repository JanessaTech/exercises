/**
 * @param {number[]} spells
 * @param {number[]} potions
 * @param {number} success
 * @return {number[]}
 */
// var successfulPairs = function(spells, potions, success) {
//     const n = spells.length
//     potions.sort((a, b) => a - b)
//     const pairs = Array(n).fill(0)
//     for (let i = 0; i < spells.length; i++) {
//         pairs[i] = calc(spells[i], potions, success)
//     }
//     return pairs
// }

// function calc(spell, portions, success) {
//     const m = portions.length
//     let lo = 0, hi = m - 1
//     while (lo <= hi) {
//         const mid = Math.floor((lo + hi) / 2)
//         const product = spell * portions[mid]
//         if (product < success) {
//             lo = mid + 1
//         } else {
//             hi = mid
//             if (hi === 0) break
//         }
//     }
//     return m - lo
// }

// const spells =  [5,1,3], potions =  [1,2,3,4,5], success = 7
// const res = successfulPairs(spells, potions, success)
// console.log(res)

const search = function(nums, target) {
    let lo = 0, hi = nums.length - 1
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2)
        if (nums[mid] < target) {
            lo = mid + 1
        } else {
            hi = mid
            if (lo === hi) break
        }
    }
    return lo
}
const nums = [0, 1, 2, 3, 4]
const res = search(nums, 5)
console.log(res)