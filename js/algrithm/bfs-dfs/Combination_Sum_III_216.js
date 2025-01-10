/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function(k, n) {
    const ans = []
    const dfs = function(start, sum, path) {
        if (path.length === k) {
            if (sum === n) {
                ans.push(path.slice())
            }
        } else {
            for (let i = start; i <= 9; i++) {
                path.push(i)
                dfs(i + 1, sum + i, path)
                path.pop()
            }
        }
    }

    dfs(1, 0, [])
    return ans
};