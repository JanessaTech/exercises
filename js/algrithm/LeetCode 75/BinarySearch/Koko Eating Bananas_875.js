/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function(piles, h) {
    const canfinish = function(v){
        let sum = 0
        for (let p of piles) {
            sum += Math.ceil(p / v)
        }
        return sum <= h
    }

    let lo = 1, hi = 1e9
    while (lo < hi) {
        const mid = Math.floor((lo + hi) /2)
        const can = canfinish(mid)
        if (can) {
            hi = mid 
        } else{
            lo = mid + 1
        }
    }
    return lo
};