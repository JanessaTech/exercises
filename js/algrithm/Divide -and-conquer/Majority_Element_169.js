/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    let cnt = 0
    let max = undefined
    for (n of nums) {
        if (cnt === 0) {
            cnt++
            max = n
        } else {
            if (n === max) {
                cnt++
            } else {
                cnt--
            }
        }
    }
    return max
};