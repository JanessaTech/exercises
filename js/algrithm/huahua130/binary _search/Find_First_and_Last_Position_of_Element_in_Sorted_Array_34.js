/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    const pos = search(nums, target)
    if (pos === -1) return [-1, -1]
    return findRange(nums, pos)

};
const findRange = function(nums, pos) {
    var start = pos, end = pos
    for (let i = pos; i >=0; i--) {
        if (nums[i] === nums[pos]) {
            start = i
        } else {
            break
        }
    }
    for (let i = pos; i < nums.length; i++) {
        if (nums[i] === nums[pos]) {
            end = i
        } else {
            break
        }
    }
    return [start, end]  
}
const search  = function(nums, target) {
    var lo = 0
    var hi = nums.length - 1
    while (lo <= hi) {
        const mid = Math.floor(( lo + hi) / 2)
        if (nums[mid] === target) {
            return mid
        } else if (nums[mid] < target) {
            lo = mid + 1
        } else {
            hi = mid - 1
        }
    }
    return -1
}

const nums = [], target = 0
const res = searchRange(nums, target)
console.log(res)
