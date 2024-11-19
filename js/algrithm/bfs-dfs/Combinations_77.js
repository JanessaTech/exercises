/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    const ans = []
    const dfs = function(start, level, path) {
        if (level === k) {
            ans.push(path.slice())
        } else {
            for (let i = start; i <= n; i++) {
                path.push(i)
                dfs( i + 1, level + 1, path)
                path.pop()
            }
        }
    }
    dfs(1, 0, [])
    return ans
};