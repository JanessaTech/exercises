/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function(k, n) {
    const ans = []
    const dfs = function(start, path, level, sum) {
        if (level === k) {
            if (sum === n) {
                ans.push(path.slice())
            }
        } else {
            for (let i = start; i <= 9; i++) {
                path.push(i)
                dfs(i + 1, path, level + 1, sum + i)
                path.pop()
            }
        }
    }
    dfs(1, [], 0, 0)
    return ans
};