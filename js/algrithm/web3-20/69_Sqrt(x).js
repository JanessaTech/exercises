/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    let lo = 0, hi = x
    while ( lo <= hi) {
        const mid = Math.floor((lo + hi) /2)
        const sq = mid * mid
        if (sq === x) {
            return mid
        } else if (sq < x) {
            lo = mid + 1
        } else {
            hi = mid - 1
        }
    }
    return hi
};