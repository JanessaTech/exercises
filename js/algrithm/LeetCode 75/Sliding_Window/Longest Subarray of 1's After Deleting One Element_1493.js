/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubarray = function(nums) {
    let start = 0; zeros = 0, max = 0
    for (let end = 0; end < nums.length; end++) {
        if (nums[end] === 0) zeros++
        while (zeros > 1) {
            if (nums[start] === 0) zeros--
            start++
        }
        max = Math.max(max, end - start)
    }
    return max
};