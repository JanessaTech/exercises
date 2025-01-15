/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(matrix, k) {
    const n = matrix.length
    const lessEqual = function(target) {
        let cnt = 0
        for (let i = n - 1, j = 0; i >= 0 && j < n;) {
            if (matrix[i][j] > target) {
                i--
            } else {
                cnt += i + 1
                j++
            }
        }
        return cnt
    }
    let lo = matrix[0][0]
    let hi = matrix[n - 1][n - 1]
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2)
        const cnt = lessEqual(mid)
        if (cnt < k) {
            lo = mid + 1
        } else {
            hi = mid
        }
    }
    return lo
};