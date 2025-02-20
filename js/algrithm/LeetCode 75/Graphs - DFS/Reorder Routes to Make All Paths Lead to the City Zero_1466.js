var minReorder = function(n, connections) {
    const graph = createGraph(n, connections)
    const visited = Array(n).fill(false)
    const cnt = dfs(graph, visited, 0)
    return cnt
};

function dfs(graph, visited, i) {
    let changes = 0
    visited[i] = true
    for (let next of graph[i]) {
        if (!visited[Math.abs(next)]) {
            changes += dfs(graph, visited, Math.abs(next)) + (next > 0 ? 1 : 0)
        }
    }
    return changes 
}

function createGraph(n, connections) {
    const graph = Array(n).fill(undefined).map((_, i) => [])
    for (let [a, b] of connections) {
        graph[a].push(b)
        graph[b].push(-1 * a)
    }
    return graph
}