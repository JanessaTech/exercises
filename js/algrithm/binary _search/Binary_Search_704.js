/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    var lo = 0, hi = nums.length - 1
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2)
        if (nums[mid] === target) {
            return mid
        } else if (nums[mid] < target) {
            lo = mid + 1
        } else {
            hi = mid - 1
        }
    }
    return - 1
};