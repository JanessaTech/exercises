/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function(n) {
    return Array(n + 1).fill().map((_, i) => i.toString(2).replace(/0/g, '').length)

    const res = Array(n + 1).fill(0)
    let offset = 1
    for (let i = 1; i < n + 1; i++) {
        if (offset * 2 === i) offset = i
        res[i] = 1 + res[i - offset]
    }
    return res;
};