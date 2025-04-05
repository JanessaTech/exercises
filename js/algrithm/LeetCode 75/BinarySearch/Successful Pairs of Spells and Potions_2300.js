/**
 * @param {number[]} spells
 * @param {number[]} potions
 * @param {number} success
 * @return {number[]}
 */
var successfulPairs = function(spells, potions, success) {
    const n = spells.length
    potions.sort((a, b) => a - b)
    const pairs = Array(n).fill(0)
    for (let i = 0; i < spells.length; i++) {
        pairs[i] = calc(spells[i], potions, success)
    }
    return pairs
}

function calc(spell, portions, success) {
    const m = portions.length
    let lo = 0, hi = m - 1
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2)
        const product = spell * portions[mid]
        if (product >= success) {
            hi = mid - 1
        } else {
            lo = mid + 1
        }
    }
    return m - lo
}