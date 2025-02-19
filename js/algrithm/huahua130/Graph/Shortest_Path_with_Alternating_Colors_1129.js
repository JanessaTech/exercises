/**
 * @param {number} n
 * @param {number[][]} redEdges
 * @param {number[][]} blueEdges
 * @return {number[]}
 */
var shortestAlternatingPaths = function(n, redEdges, blueEdges) {
    const digraph = createDigraph(n,  redEdges, blueEdges)
    const dists = Array(n).fill(-1)

    const queue = [[0, 1], [0, -1]]
    let level = 0

    while (queue.length) {
        const size = queue.length
        for (let i = 0; i < size; i++) {
            const [cur, color] = queue.shift()
            dists[cur] = dists[cur] === -1 ? level : dists[cur]
            for (let next of digraph[cur]) {
                const [v, col, visited] = next
                if (col === color || visited) continue
                queue.push([v, -1 * color])
                next[2] = true
            }
        }
        level++
    }
    return dists
}

function createDigraph(n, redEdges, blueEdges) {
    const digraph = Array(n).fill(undefined).map((_, i) => [])
    for (let red of redEdges) {
        const [a, b] = red
        digraph[a].push([b, 1, false])
    }
    for (let blue of blueEdges) {
        const [u, v] = blue
        digraph[u].push([v, -1, false])
    }
    return digraph
}

const n = 3, redEdges = [[0,1],[1,2]], blueEdges = []

const res = shortestAlternatingPaths(n, redEdges, blueEdges)
console.log(res)
