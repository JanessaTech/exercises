/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    var lo = 0
    var hi = x
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2)
        const res = mid * mid
        if (res === x) {
            return mid
        } else if (res < x) {
            lo = mid + 1
        } else {
            hi = mid - 1
        }
    }
    return hi
};