/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function(nums, target) {
    var lo = 0
    var hi = nums.length - 1
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2)
        if (nums[mid] === target) {
            return true
        }
        if (nums[lo] < nums[mid] || nums[hi] < nums[mid]) {
            if (target < nums[mid] && target >= nums[lo]) {
                hi = mid - 1
            } else {
                lo = mid + 1
            }
        } else if (nums[hi] > nums[mid] || nums[lo] > nums[mid]) {
            if (target <= nums[hi] && target > nums[mid]) {
                lo = mid + 1
            } else {
                hi = mid - 1
            }
        } else {
            lo++
        }
    }
    return false
    
};