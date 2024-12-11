/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
    const ans = Array(3)
    nums.sort((a, b) => a - b)
    let closet = Number.MAX_VALUE

    for (let i = 0; i < nums.length; i++) {
        let j = i + 1
        let k = nums.length - 1

        while ( j < k) {
            const sum = nums[i] + nums[j] + nums[k]
            if (Math.abs(sum - target) < closet) {
                closet = Math.abs(sum - target)
                ans[0] = nums[i]
                ans[1] = nums[j]
                ans[2] = nums[k]
            }
            if (sum === target) {
                break
            } else if (sum > target) {
                k--
            } else {
                j++
            }
        }
    }
    return ans[0] + ans[1] + ans[2]
};


const nums = [4,0,5,-5,3,3,0,-4,-5], target = -2
const res = threeSumClosest(nums, target)
console.log(res)
