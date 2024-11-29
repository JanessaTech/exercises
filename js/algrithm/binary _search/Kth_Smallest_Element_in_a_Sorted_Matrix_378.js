/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(matrix, k) {
    const n = matrix.length

    const getCount = function(target) {
        var count = 0
        for (let i = n - 1, j = 0; i >=0 && j < n;) {
            if (matrix[i][j] > target) {
                i--
            } else {
                count += i + 1
                j++
            }
        }
        return count
    }

    var lo = matrix[0][0]
    var hi = matrix[n - 1][n - 1]

    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2)
        const count = getCount(mid) 
        if (count < k) {
            lo = mid + 1
        } else {
            hi = mid
        }
    }
    return lo
};