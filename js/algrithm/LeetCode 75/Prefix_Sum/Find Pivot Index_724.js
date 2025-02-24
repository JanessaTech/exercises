/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function(nums) {
    let sum = nums[0]
    const aux = Array(nums.length).fill(0)
    for (let i = 1; i < nums.length; i++) {
        aux[i] = aux[i - 1] + nums[i - 1]
        sum += nums[i]
    }
    for (let i = 0; i < nums.length; i++) {
        if (aux[i] === sum - nums[i] - aux[i]) return i
    }
    return -1

};

const nums =   [1,7,3,6,5,6]
const res = pivotIndex(nums)

console.log(res)