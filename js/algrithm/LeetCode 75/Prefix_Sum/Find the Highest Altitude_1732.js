/**
 * @param {number[]} gain
 * @return {number}
 */
var largestAltitude = function(gain) {
    let al = 0
    let max = 0
    for (let g of gain) {
        al += g
        if (al > max) max = al
    }
    return max
};