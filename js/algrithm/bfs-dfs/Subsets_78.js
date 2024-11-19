/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    const ans = []
    const dfs = function(start, path) {
        ans.push(path.slice())
        for (let i = start; i < nums.length; i++) {
            path.push(nums[i])
            dfs(i + 1, path)
            path.pop()
        }
    }
    dfs(0, [])
    return ans
};