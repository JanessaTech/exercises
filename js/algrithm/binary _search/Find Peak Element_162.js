/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function(nums) {
    const n = nums.length
    if (n === 1) return 0
    if (nums[0] > nums[1]) return 0
    if (nums[n - 1] > nums[n - 2]) return n -2
    var lo = 1
    var hi = n -2
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2)
        if (nums[mid] > nums[mid - 1] && nums[mid] > nums[mid + 1]) return mid
        else if (nums[mid - 1] > nums[mid]) {
            hi = mid - 1
        } else if (nums[mid + 1] > nums[mid]) {
            lo = mid + 1
        }
    }
    return -1
};