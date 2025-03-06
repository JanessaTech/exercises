/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let write = 0
    let cnt = 1
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[write]) {
            if (cnt < 2) {
                write++
                nums[write] = nums[i]
                cnt++
            } else {
                continue
            }
        } else {
            write++
            nums[write] = nums[i]
            cnt = 1
        }
    }
    return write + 1
};