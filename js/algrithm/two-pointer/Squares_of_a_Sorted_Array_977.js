/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
    let low = 0, hi = nums.length - 1
    const ans = Array(nums.length)
    let p = nums.length - 1
    while (low <= hi) {
        if (nums[low] ** 2 <= nums[hi] ** 2) {
            ans[p--] = nums[hi] ** 2
            hi--
        } else {
            ans[p--] = nums[low] ** 2
            low++
        }
    }
    
    return ans
};

const nums = [-7,-3,2,3,11]
const res = sortedSquares(nums)
console.log(res)