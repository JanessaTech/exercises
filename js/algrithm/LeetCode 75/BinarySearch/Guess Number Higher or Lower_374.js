/** 
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function(n) {
    let lo = 1, hi = n
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2)
        const g = guess(mid)
        if (g === 0) {
            return mid
        } else if (g < 0) {
            hi = mid - 1
        } else {
            lo = mid + 1
        }
    }
    return -1
};