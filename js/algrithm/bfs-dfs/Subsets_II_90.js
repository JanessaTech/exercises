/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
    const ans = []
    const dfs = function(start, path) {
        ans.push(path.slice())
        for (let i = start; i < nums.length; i++) {
            if (i > start && nums[i] === nums[i - 1]) continue
            path.push(nums[i])
            dfs(i + 1, path)
            path.pop()
        }
    }
    nums.sort()
    dfs(0, [])
    return ans
};