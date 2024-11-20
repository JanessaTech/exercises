/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    const ans = []
    const dfs = function(path, left, right, balance) {
        if (left === n && right === n && balance === 0) {
            ans.push(path.join(''))
        } else {
            if (balance) {
                if (left < n) {
                    path.push('(')
                    dfs(path, left + 1, right, balance + 1)
                    path.pop()
                }
                if (right < n) {
                    path.push(')')
                    dfs(path, left, right + 1, balance - 1)
                    path.pop()
                }
            } else { //balance === 0
                path.push('(')
                dfs(path, left + 1, right, balance + 1)
                path.pop()
            }
        }

    }
    dfs([], 0, 0, 0)
    return ans
};