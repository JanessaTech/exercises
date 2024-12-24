/**
 * @param {string} startGene
 * @param {string} endGene
 * @param {string[]} bank
 * @return {number}
 */
var minMutation = function(start, end, bank) {
    const queue = []
    const visited = new Set()
    queue.push(start)
    visited.add(start)
    let cnt = 0

    while (queue.length) {
        const size = queue.length
        for (let i = 0; i < size; i++) {
            const cur = queue.shift()
            if (cur === end) return cnt
            for (let b of bank) {
                if (!visited.has(b)) {
                    const di = diff(b, cur)
                    if (di === 1) {
                        queue.push(b)
                        visited.add(b)
                    }
                }
            }
        }
        cnt++
    }

    return cnt
}

function diff(str1, str2) {
    let cnt = 0
    for (let i = 0; i < 8; i++) {
        if (str1.charAt(i) !== str2.charAt(i)) cnt++
    }
    return cnt
}

const startGene = "AACCGGTT", endGene = "AAACGGTA", bank = ["AACCGGTA","AACCGCTA","AAACGGTA"]

const res = minMutation(startGene, endGene, bank)
console.log(res)