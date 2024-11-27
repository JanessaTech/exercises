/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function(nums) {
    if (nums.length === 1) return 0
    const n = nums.length
    if (nums[0] > nums[1]) return 0
    if (nums[n - 1] > nums[n - 2]) return n - 1
    var lo = 1
    var hi = n - 2
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2)
        if (nums[mid] > nums[mid - 1] && nums[mid] > nums[mid + 1]) return mid
        if (nums[mid] < nums[mid - 1] ) {
            hi = mid - 1
        }
        if (nums[mid] < nums[mid + 1]) {
            lo = mid + 1
        }
    }
    return -1

};

// https://leetcode.com/problems/find-peak-element/