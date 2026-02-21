/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    const set  = new Set(nums)
    let streak = 0
    for (let num of set) {
        if (!set.has(num - 1)) {
            let cur = num
            let curStreak = 1

            while (set.has(cur + 1)) {
                curStreak++
                cur++
            }
            streak = Math.max(streak, curStreak)
        }
    }
    return streak
};