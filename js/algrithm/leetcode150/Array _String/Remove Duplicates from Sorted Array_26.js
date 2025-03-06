/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let write = 0
    for (let i = 1; i <nums.length; i++) {
        if (nums[write] !== nums[i]) {
            write++
            nums[write] = nums[i]
        }
    }
    return write + 1
};