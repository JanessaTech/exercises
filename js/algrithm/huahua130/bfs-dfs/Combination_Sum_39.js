/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    const ans  = []
    const dfs  = function(start, sum, path) {
        if (sum === target) {
            ans.push(path.slice())
        } else {
            for (let i = start; i < candidates.length; i++) {
                const can = candidates[i]
                if (can + sum > target) continue
                path.push(can)
                dfs(i, can + sum, path)
                path.pop()
            }
        }

    }

    dfs(0, 0, [])

    return ans
};