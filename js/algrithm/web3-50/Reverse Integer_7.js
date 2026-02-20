/**
 * @param {number} x
 * @return {number}
 */

var reverse = function(x) {
    let bit = Math.pow(2, 31)
    let reversed = Math.abs(x).toString().split('').reverse().join('')
    if (x < 0) reversed = '-' + reversed
    const res = parseInt(reversed)
    if (res >= - bit && res <= bit - 1) return res
    return 0
};

const res = reverse(123)
console.log(res)