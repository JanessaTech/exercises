/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(n, prerequisites) {
    //const res = dfs_solution(n, prerequisites)
    const res =  bfs_solution(n, prerequisites)
    return res
};

function dfs_solution(n, prerequisites) {
    const digraph = createDigraph(n, prerequisites) 
    const visited = Array(n).fill(0)
    for (let i = 0; i < n ;i ++) {
        if (visited[i] == 0) {
            if (!dfs(digraph, visited, i)) return false
        }
    }
    return true
}
function dfs(digraph, visited, i) {
    visited[i] = 1
    for (let next of digraph[i]) {
        if (visited[next] === 1) return false
        if (visited[next] == 0) {
            if (!dfs(digraph, visited, next)) return false
        }
    }
    visited[i] = 2
    return true
}

function createDigraph(n, prerequisites) {
    const digraph = Array(n).fill(undefined).map((_, i) => [])
    for (let [a, b] of prerequisites) {
        digraph[b].push(a)
    }
    return digraph
}

function bfs_solution(n, prerequisites) {
    const degree = Array(n).fill(0)
     const digraph = Array(n).fill(undefined).map((_, i) => [])
    for (let [a, b] of prerequisites) {
        digraph[b].push(a)
        degree[a]++
    }
    const queue = []
    for (let i = 0; i < n; i++) {
        if (degree[i] == 0) queue.push(i)
    }
    
    let cnt = 0
    while (queue.length) {
        const cur = queue.shift()
        cnt++
        for(let next of digraph[cur]) {
            if (--degree[next] == 0) queue.push(next)
        }
    }
    return cnt === n
}