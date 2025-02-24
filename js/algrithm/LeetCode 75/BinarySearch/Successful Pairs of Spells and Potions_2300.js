/**
 * @param {number[]} spells
 * @param {number[]} potions
 * @param {number} success
 * @return {number[]}
 */
var successfulPairs = function(spells, potions, success) {
    const n = spells.length
    const ans = Array(n).fill(0)
    potions.sort((a, b) => a - b)
    for (let i = 0; i < n; i++) {
        ans[i] = calPairs(spells[i], potions, success)
    }
    return ans
};

function calPairs(spell, potions, success) {
    const m = potions.length
    let lo = 0, hi = m - 1
    while (lo <= hi) {
        const mid = Math.floor((lo +hi) /2)
        const product = spell * potions[mid]
        if (product >= success) {
            hi = mid - 1
        } else {
            lo = mid + 1
        }
    }
    if (hi === m) return 0
    return m - hi - 1
}