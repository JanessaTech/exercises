/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function(nums, k) {
    let sum = 0
    for (let j = 0; j < k; j++) {
        sum += nums[j]
    }

    let max = sum
    for (let i = 1; i < nums.length - k + 1; i++) {
        sum = sum - nums[i - 1] + nums[i + k - 1]
        if (sum > max) max = sum
    }

    return max / k
};

const nums = [0,4,0,3,2], k = 1

const res = findMaxAverage(nums, k)
console.log(res)