/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestOnes = function(nums, k) {
    let zeros = 0, start = 0, max = 0
    for (let end = 0; end < nums.length; end++) {
        if (nums[end] === 0) zeros++
        while (zeros > k) {
            if (nums[start] === 0) zeros--
            start++
        }
        max = Math.max(max, end - start + 1)
    }
    return max
};