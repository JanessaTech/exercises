/**
 * @param {number[][]} graph
 * @return {boolean}
 */
var isBipartite = function(graph) {
    //const res = dfs_solution(graph)
    const res = bfs_solution(graph)
    return res
};

function nextColor(color) {
    if (color === 2) return 1
    return color + 1
}

function bfs_solution(graph) {
    const queue = []
    const n = graph.length
    const visited = Array(n).fill(0)
    let color = 1
    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            queue.push([i, color])
            visited[i] = color
        }

        while (queue.length) {
            const [cur, color] = queue.shift()
            for (let next of graph[cur]) {
                if (!visited[next]) {
                    const newColor = nextColor(color)
                    queue.push([next, newColor])
                    visited[next] = newColor
                } else {
                    if (color === visited[next]) return false
                }
            }
        }
    }

    return true
}

function dfs_solution(graph) {
    const n = graph.length
    const visited = Array(n).fill(false)
    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            if (!dfs(graph, i, visited, 1)) return false
        }
    }

    return true
}



function dfs(graph, i, visited, color) {
    visited[i] = color
    let newColor = nextColor(color)
    for (let next of graph[i]) {
        if (!visited[next]) {
            if (!dfs(graph, next, visited, newColor)) return false
        } else {
            if (color === visited[next]) return false
        }
    }

    return true
}
