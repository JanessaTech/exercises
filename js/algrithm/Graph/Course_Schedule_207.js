/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    //const can  = dfs(numCourses, prerequisites)
    const can  = bfs(numCourses, prerequisites)
    return can
}

function dfs(numCourses, prerequisites) {
    const digraph = Array(numCourses).fill(undefined).map((_, i) => [])
    for (let pre of prerequisites) {
        digraph[pre[1]].push(pre[0])
    }
    const visited = Array(numCourses).fill(0)
    for (let i = 0; i < numCourses; i++) {
        if (visited[i] == 0) {
            if (!_dfs(digraph, i, visited)) return false
        }
    }
    return true
}

function _dfs(digraph, i, visited) {
    visited[i] = 1
    for (let next of digraph[i]) {
        if (visited[next] === 1) return false
        if (visited[next] === 0) {
            if (!_dfs(digraph, next, visited)) return false
        }
    }
    visited[i] = 2
    return true
}

function bfs(numCourses, prerequisites) {
    const digraph = Array(numCourses).fill(undefined).map((_, i) => [])
    const degree = Array(numCourses).fill(0)
    for (let pre of prerequisites) {
        digraph[pre[1]].push(pre[0])
        degree[pre[0]]++
    }

    const queue = []
    for (let i = 0; i < numCourses; i++) {
        if (degree[i] === 0) queue.push(i)
    }


    let cnt = 0
    while (queue.length) {
        const cur  = queue.shift()
        for (let next of digraph[cur]) {
            if (--degree[next] === 0) {
                queue.push(next)
            }
        }
        cnt++
    }

    return cnt === numCourses ? true : false
}

