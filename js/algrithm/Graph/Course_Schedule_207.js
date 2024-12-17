/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    //const res = bfs(numCourses, prerequisites)
    const res = dfs(numCourses, prerequisites)
    return res
};

function dfs(numCourses, prerequisites) {
    const digraph = []
    const visited = Array(numCourses).fill(false)
    const memo = Array(numCourses).fill(false)
    for (let pre of prerequisites) {
        if (!digraph[pre[1]]) {
            digraph[pre[1]] = []
        }
        digraph[pre[1]].push(pre[0])
    }
    for (let i = 0; i < numCourses; i++) {
        if (!_dfs(digraph, visited, i, memo)) {
            return false
        }
    }
    return true
}
function _dfs(digraph, visited, i, memo) {
    if (visited[i]) return false
    if (memo[i]) return true
    visited[i] = true
    if(digraph[i]) {
        for (let next of digraph[i]) {
            if (!_dfs(digraph, visited, next, memo)) {
                return false
            }
        }
    }
    visited[i] = false
    memo[i] = true
    return true
}

function bfs(numCourses, prerequisites) {
    const digraph = []
    const degree = Array(numCourses).fill(0)
    const queue = []
    let cnt = 0

    for(let pre of prerequisites) {
        if (!digraph[pre[1]]) {
            digraph[pre[1]] = []
        }
        digraph[pre[1]].push(pre[0])
        degree[pre[0]]++
    }
    for (let i = 0; i < numCourses; i++) {
        if (degree[i] === 0) {
            queue.push(i)
        }
    }

    while (queue.length) {
        const cur = queue.shift()
        if (digraph[cur]) {
            for (let next of digraph[cur]) {
                if (--degree[next] === 0) {
                    queue.push(next)
                }
            }
        }
        cnt++
    }

    return cnt === numCourses
}
