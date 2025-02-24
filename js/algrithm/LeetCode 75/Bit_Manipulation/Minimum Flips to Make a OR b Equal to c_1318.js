/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number}
 */
var minFlips = function(a, b, c) {
    let ret = 0
    while (a > 0 || b > 0 || c > 0) {
        if (((a & 1) | (b & 1)) !== (c & 1)) {
            if ((a & 1) === 1 && (b & 1) === 1) {
                ret += 2
            } else {
                ret += 1
            }
        }
        a >>>= 1
        b >>>= 1
        c >>>= 1
    }

    return ret
};