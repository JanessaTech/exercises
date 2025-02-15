/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function(piles, h) {
    var lo = 1
    var hi = 1e9
    const finish = function (v) {
        var sum = 0
        for (let i = 0; i < piles.length; i++) {
            sum += Math.ceil(piles[i] / v)
        }
        return sum <= h
    }

    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2)
        const f = finish(mid) 
        if (f) {
            hi = mid - 1
        } else {
            lo = mid + 1
        }
    }
    return lo
};