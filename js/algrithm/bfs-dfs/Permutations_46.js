/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    const visited = Array(nums.length).fill(false)
    const ans = []
    const dfs = function(level, path) {
        if (level === nums.length) {
            ans.push(path.slice())
        } else {
            for (let i = 0; i < nums.length; i++) {
                if (!visited[i]) {
                    visited[i] = true
                    path.push(nums[i])
                    dfs(level + 1, path)
                    path.pop()
                    visited[i] = false
                }
            }
        }
    }
    dfs(0, [])
    return ans 
};