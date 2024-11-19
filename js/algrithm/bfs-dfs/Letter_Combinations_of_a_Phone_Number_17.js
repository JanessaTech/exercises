/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    const map  = new Map([
        ['2', ['a', 'b', 'c']], 
        ['3', ['d', 'e', 'f']],
        ['4', ['g', 'h', 'i']],
        ['5', ['j', 'k', 'l']],
        ['6', ['m', 'n', 'o']],
        ['7', ['p', 'q', 'r', 's']],
        ['8', ['t', 'u', 'v']],
        ['9', ['w', 'x', 'y', 'z']]
    ])

    const ans = []

    const dfs = function(level, path) {
        if (level === digits.length) {
            if (path.length) {
                ans.push(path.join(''))
            } 
        } else {
            const dig = digits.charAt(level)
            const candidates = map.get(dig)
            for (let candidate of candidates) {
                path.push(candidate)
                dfs(level + 1, path)
                path.pop()
            }
        }
    }
    dfs(0, [])

    return ans
};