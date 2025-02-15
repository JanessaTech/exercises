/**
 * @param {number} n
 * @param {number[][]} dislikes
 * @return {boolean}
 */
var possibleBipartition = function(n, dislikes) {
    const visited = Array(n).fill(0)
    const graph = createGraph(n, dislikes)
    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            if (!dfs(graph, i, visited, 1)) return false
        }
    }

    return true
};

function dfs(graph, i, visited, color) {
    visited[i] = color
    for (let next of graph[i]) {
        if (!visited[next]) {
            if (!dfs(graph, next, visited, -1 * color)) return false
        } else {
            if (visited[next] === color) return false
        }
    }
    return true
}



function createGraph(n, dislikes) {
    const graph = Array(n).fill(undefined).map((_, i) => [])
    for (let dislike of dislikes) {
        let a = dislike[0] - 1
        let b = dislike[1] - 1
        graph[a].push(b)
        graph[b].push(a)
    }
    return graph

}