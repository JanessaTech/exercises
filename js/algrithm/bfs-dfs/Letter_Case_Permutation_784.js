/**
 * @param {string} s
 * @return {string[]}
 */
var letterCasePermutation = function(s) {
    const isNumber = function(ch) {
        return ch >= '0' && ch <= '9'
    }
    const isLetter = function(ch) {
        return ch.toUpperCase() !== ch.toLowerCase()
    }
    const ans = []
    const dfs = function(level, path) {
        if (level === s.length) {
            ans.push(path.join(''))
        } else {
            const ch = s.charAt(level)
            if (isNumber(ch)) {
                path.push(ch)
                dfs(level + 1, path)
                path.pop()
            } else {
                const lower = ch.toLowerCase()
                path.push(lower)
                dfs(level + 1, path)
                path.pop()
                const upper = ch.toUpperCase()
                path.push(upper)
                dfs(level + 1, path)
                path.pop()
            }
        }
    }
    dfs(0, [])
    return ans
}; 