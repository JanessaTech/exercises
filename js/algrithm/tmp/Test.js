/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function(times, n, k) {
    const digraph = createDigraph(times, n)
    const visited = Array(n).fill(false)
    const dists = Array(n).fill(Number.MAX_VALUE)

    dists[k - 1] = 0
    let node = k - 1
    let cnt = 0
    while (node !== -1) {
        const dist = dists[node]
        for (let next of digraph[node]) {
            let newCost = dist + next[1]
            if (newCost < dists[next[0]]) {
                dists[next[0]] = newCost
            }
        }
        visited[node] = true
        cnt++
        node = findLowest(dists, visited)
    }

    if (cnt !== n) return -1
    let max = 0
    for (let dist of dists) {
        if (dist > max) {
            max = dist
        }
    }
    return max
};

function createDigraph(times, n) {
    const digraph = Array(n).fill(undefined).map((_, i) => [])
    for (let time of times) {
        const u = time[0] - 1
        const v = time[1] - 1
        const w = time[2]
        digraph[u].push([v, w])
    }
    return digraph
}

function findLowest(dists, visited) {
    let low = Number.MAX_VALUE
    let node = -1
    for (let i = 0; i < dists.length; i++) {
        if (dists[i] < low && !visited[i]) {
            low = dists[i]
            node = i
        }
    }
    return node
}

const times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
const res = networkDelayTime(times, n, k)
console.log(res)