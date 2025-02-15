/**
 * @param {number[][]} graph
 * @return {boolean}
 */
var isBipartite = function(graph) {
    //const res = dfs_solution(graph)
    const res = bfs_solution(graph)
    return res
};

function dfs_solution(graph) {
    const n = graph.length
    const visited = Array(n).fill(0)
    for (let i = 0; i < n; i++) {
        if (visited[i] === 0) {
            if (!dfs(graph, i, visited, 1)) return false
        }
    }
    return true
}

function dfs(graph, i, visited, color) {
    visited[i] = color
    for (let next of graph[i]) {
        if (visited[next] === color) return false
        if (visited[next] === 0) {
            if (!dfs(graph, next, visited, -1 * color)) return false
        }
    }
    return true
}

function bfs_solution(graph) {
    const n = graph.length
    const visited = Array(n).fill(0)
    
    for (let i = 0; i < n; i++) {
        const queue = []
        if (visited[i] === 0) {
            queue.push([i, 1])
            visited[i]= 1
        }

        while (queue.length) {
            const [cur, color] = queue.shift()
            for (let next of graph[cur]) {
                if (visited[next] === color) return false
                if (visited[next] === 0) {
                    queue.push([next, -1 * color])
                    visited[next] = -1 * color
                }
            }
        }

    }

    return true
}