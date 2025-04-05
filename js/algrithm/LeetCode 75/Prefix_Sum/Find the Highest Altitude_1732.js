/**
 * @param {number[]} gain
 * @return {number}
 */
var largestAltitude = function(gain) {
    let acc = 0
    let max = 0
    for (let g of gain) {
        acc += g
        if (acc > max) max = acc
    }
    return max
};