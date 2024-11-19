/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    const ans = []
    const dfs = function(start, sum, path) {
        if (sum === target) {
            ans.push(path.slice())
        } else {
            for (let i = start; i < candidates.length; i++) {
                if (candidates[i] + sum > target) continue
                if (i !== start && candidates[i] === candidates[i - 1]) continue
                path.push(candidates[i])
                dfs(i + 1, candidates[i] + sum, path)
                path.pop()
            }
        }
    }

    candidates.sort()
    dfs(0, 0, [])

    return ans
    
};