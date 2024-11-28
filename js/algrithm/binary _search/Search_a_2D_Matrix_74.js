/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    const m = matrix.length
    const n = matrix[0].length
    const findRow = function() {
        var lo = 0
        var hi = m - 1
        while (lo <= hi) {
            const mid = Math.floor((lo + hi) / 2)
            if (matrix[mid][0] === target) {
                return mid
            } else if (matrix[mid][0] < target) {
                lo = mid + 1
            } else {
                hi = mid - 1
            }
        }
        return hi
    }
    const findCol = function(row) {
        var lo = 0
        var hi = n - 1
        while (lo <= hi) {
            const mid = Math.floor((lo + hi) / 2)
            if (matrix[row][mid] === target) {
                return mid
            } else if (matrix[row][mid] < target) {
                lo = mid + 1
            } else {
                hi = mid - 1
            }
        }
        return hi
    }
    const row = findRow()
    if (row === -1) return false
    const col = findCol(row)
    if (col === -1 || matrix[row][col] !== target) return false
    return true
};