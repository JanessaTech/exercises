/**
 * @param {number} n
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(n, prerequisites) {
    //const res = dfs_solution(n, prerequisites)
    const res = bfs_solution(n, prerequisites)
    return res
};

function dfs_solution(n, prerequisites) {
    const digraph = createDigraph(n, prerequisites)
    const order = []
    const visited = Array(n).fill(0)
    for (let i = 0; i < n; i++) {
        if (visited[i] == 0) {
            if (!dfs(digraph, visited, i, order)) return []
        }
    }

    const ans = []
    while (order.length) {
        ans.push(order.pop())
    }
    return ans
}
function dfs(digraph, visited, i, order) {
    visited[i] = 1
    for (let next of digraph[i]) {
        if (visited[next] === 1) return false
        if (visited[next] === 0) {
            if (!dfs(digraph, visited, next, order)) return false
        }
    }
    visited[i] = 2
    order.push(i)
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
    const ans = []
    const queue = []
    for (let i = 0; i < n; i++) {
        if (degree[i] === 0) {
            queue.push(i)
        } 
    }

    while (queue.length) {
        const size = queue.length
        for (let i = 0; i < size; i++) {
            const cur = queue.shift()
            ans.push(cur)
            for (let next of digraph[cur]) {
                if (--degree[next] === 0) {
                    queue.push(next)
                }
            }
        }
    }

    return ans.length === n ? ans : []
}
