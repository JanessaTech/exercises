/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function(deadends, target) {
    
    const queue = []
    const visited = new Set()
    const dead = new Set(deadends)
    const start = '0000'
    if (dead.has(start)) return -1
    var level = 0
    queue.push(start)
    visited.add(start)

    const move = function(seq, k, dir) {
        const slots = seq.split('').map((v) => parseInt(v))
        if (dir === -1) {
            slots[k] =  (slots[k] - 1 + 10) % 10
        } else {
            slots[k] = (slots[k] + 1) % 10
        }
        return slots.join('')
    }

    while (queue.length) {
        const size = queue.length 
        for (let i = 0; i < size; i++) {
            const cur = queue.shift()
            if (cur === target) {
                return level
            }
            for (let k = 0; k < 4; k++) {
                const back = move(cur, k, -1)
                const forward = move(cur, k, 1)
                if (!dead.has(back) && !visited.has(back)) {
                    queue.push(back)
                    visited.add(back)
                }
                if (!dead.has(forward) && !visited.has(forward)) {
                    queue.push(forward)
                    visited.add(forward)
                }
            }
        }
        level++
    }
    return -1
};

const deadends = ["0000"]
const target = "8888"

const res = openLock(deadends, target)
console.log('res:', res)

// This version is too slow. check the below to enhance it
// https://leetcode.com/problems/open-the-lock/solutions/5058617/accepted-java-code-beats-91/?source=submission-ac