/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    const ans = []
    const dfs = function(pos, path) {
        if (path.length === k) {
            ans.push(path.slice())
        } else {
            for (let i = pos; i <= n; i++) {
                path.push(i)
                dfs(i + 1, path)
                path.pop()
            }
        }
    }

    dfs(1, [])
    return ans
};