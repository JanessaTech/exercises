/**
 * @param {number} n
 * @param {number[][]} redEdges
 * @param {number[][]} blueEdges
 * @return {number[]}
 */
var shortestAlternatingPaths = function(n, redEdges, blueEdges) {
    const digraph = createDigraph(n, redEdges, blueEdges)
    const ans = Array(n).fill(-1)
    searchPath(n, digraph, ans)
    return ans
};

function searchPath(n, digraph, ans) {
    const queue = []
    queue.push([0, 1])
    queue.push([0, -1])

    let steps = 0
    while(queue.length) {
        const size = queue.length
        for (let i = 0; i < size; i++) {
            const cur = queue.shift()
            const u = cur[0]
            const color = cur[1]
            ans[u] = ans[u] === -1 ? steps : ans[u]
            for (let k = 0; k < digraph[u].length; k++) {
                const next = digraph[u][k]
                const v = next[0]
                const nextColor = next[1]
                const visited = next[2]
                if (visited || color === nextColor) continue
                queue.push([v, nextColor])
                next[2] = true
            }
        }
        steps++
    } 
}


function createDigraph(n, redEdges, blueEdges) {
    const digraph = Array(n).fill(undefined).map((_, i) => [])
    for (let red of redEdges) {
        const a = red[0]
        const b = red[1]
        digraph[a].push([b, 1, false])
    }
    for (let blue of blueEdges) {
        const a = blue[0]
        const b = blue[1]
        digraph[a].push([b , -1, false])
    }
    return digraph
}

const n = 3, redEdges = [[0,1],[1,2]], blueEdges = []

const res = shortestAlternatingPaths(n, redEdges, blueEdges)
console.log(res)
