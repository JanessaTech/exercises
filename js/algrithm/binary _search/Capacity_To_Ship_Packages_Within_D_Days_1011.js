/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
var shipWithinDays = function(weights, days) {
    var lo = 1
    var hi = 500 * weights.length
    const finish = function(w) {
        var d = 0
        var sum = 0
        for (let i = 0; i < weights.length; i++) {
            if (weights[i] > w) return false
            if (sum + weights[i] <= w) {
                sum += weights[i]
            } else {
                d++
                sum = weights[i]
            }
        }
        if (sum) {
            d++
        }
        return d <= days

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