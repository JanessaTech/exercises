/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function(equations, values, queries) {
    const graph = createGraph(equations, values)
    const ans = []
    for (let i = 0; i < queries.length; i++) {
        const [src, dst] = queries[i]
        const visited = new Set()
        ans[i] = dfs(graph, src, dst, visited, 1)
    }
    return ans
}

function dfs(graph, src, dst, visited, weight) {
    if (!graph.has(src)) return -1
    if (src === dst) return weight
    visited.add(src)
    for (let [next, wei] of graph.get(src)) {
        if (!visited.has(next)) {
            const res = dfs(graph, next, dst, visited, weight * wei)
            if (res !== -1) return res
        }
    }
    return -1
}
function createGraph(equations, values) {
    const graph = new Map()
    for (let i = 0; i < equations.length; i++) {
        const [a, b] = equations[i]
        const value = values[i]
        if (!graph.has(a)) graph.set(a, [])
        if (!graph.has(b)) graph.set(b, [])
        graph.get(a).push([b, value])
        graph.get(b).push([a, 1 / value])
    }
    return graph
}
