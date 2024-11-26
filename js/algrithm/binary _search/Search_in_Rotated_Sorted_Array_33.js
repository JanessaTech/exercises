/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    var lo = 0
    var hi = nums.length - 1
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2)
        if (nums[mid] === target) {
            return mid
        }
        if (nums[lo] <= nums[mid]) {
            if (target <= nums[mid] && target >= nums[lo]) {
                hi = mid - 1
            } else {
                lo = mid + 1
            }
        } else {
            if (target >= nums[mid] && target <= nums[hi]) {
                lo = mid + 1
            } else {
                hi = mid - 1
            }
        }
    } 
    return -1
};