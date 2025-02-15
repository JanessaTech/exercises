/**
 * @param {string} s
 * @return {string[]}
 */
var letterCasePermutation = function(s) {
    const isNumber= function(ch) {
        return ch >= '0' && ch <= '9'
    }
    const isChar = function(ch) {
        return ch.toLowerCase() !== ch.toUpperCase()
    }
    const ans = []

    const dfs = function(pos, path) {
        if (pos === s.length) {
            ans.push(path.join(''))
        } else {
            const cur = s.charAt(pos)
            if (isNumber(cur)) {
                path.push(cur)
                dfs(pos + 1, path)
                path.pop()
            } else {
                const lower = cur.toLowerCase()
                path.push(lower)
                dfs(pos + 1, path)
                path.pop()
                const upper = cur.toUpperCase()
                path.push(upper)
                dfs(pos + 1, path)
                path.pop()
            }
        }
    }

    dfs(0, [])
    return ans
};