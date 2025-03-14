/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    var lo = 0
    var hi = nums.length - 1
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2)
        if (nums[mid] > nums[hi]) {
            lo = mid + 1
        } else {
            hi = mid
        }
    }
    return nums[lo]
};