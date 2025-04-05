/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var minReorder = function(n, connections) {
    const graph = createGraph(n, connections)
    const visited = Array(n).fill(false)
    const res = dfs(graph, visited, 0)
    return res
}

function dfs(graph, visited, i) {
    visited[i] = true
    let changes = 0
    for (let [next, dir] of graph[i]) {
        if (!visited[next]) {
            changes += dfs(graph, visited, next) + dir
        }
    }
    return changes
}

function createGraph(n, connections) {
    const graph = Array(n).fill(undefined).map((_, i) => [])
    for (let [a, b] of connections) {
        graph[a].push([b, 1])
        graph[b].push([a, 0])
    }
    return graph
}