/**
 * @param {number} n
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge = function(n, trust) {
    const inDegree = Array(n + 1).fill(0)
    const outDegree = Array(n + 1).fill(0)
    for (let t of trust) {
        let a = t[0]
        let b = t[1]
        inDegree[b]++
        outDegree[a]++
    }
    for (let i = 1; i <= n; i++) {
        if (inDegree[i] === n - 1 && outDegree[i] === 0) return i
    }
    return -1
}