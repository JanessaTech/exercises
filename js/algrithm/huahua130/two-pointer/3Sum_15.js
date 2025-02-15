/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    let ans = []
    nums.sort((a, b) => a - b)
    for (let i = 0; i < nums.length; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue
        }
        let j = i + 1
        let k = nums.length - 1
        
        while (j < k) {
            const sum = nums[i] + nums[j] + nums[k]
            if (sum === 0) {
                ans.push([nums[i], nums[j], nums[k]])
                j++
                while (nums[j] === nums[j - 1] && j < k) {j++}
            } else if (sum > 0) {
                k--
            } else {
                j++
            }
        }
    } 

    return ans
};


const nums = [-4,-1,-1,-1,1,2,5]
const res = threeSum(nums)
console.log(res)