/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    let cnt = 0
    let max = undefined
    for (let num of nums) {
        if (cnt === 0) {
            cnt++
            max = num
        } else {
            if (num === max) {
                cnt++
            } else {
                cnt--
            }
        }
    }

    return max
};