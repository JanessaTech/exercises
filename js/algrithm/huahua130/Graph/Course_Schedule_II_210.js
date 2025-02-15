/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(numCourses, prerequisites) {
    //const ans = bfs(numCourses, prerequisites)
    const ans = dfs(numCourses, prerequisites)
    return ans
};

function dfs(numCourses, prerequisites) {
    const digraph = []
    const visited = Array(numCourses).fill(0)
    for (let pre of prerequisites) {
        if (!digraph[pre[1]]) {
            digraph[pre[1]] = []
        }
        digraph[pre[1]].push(pre[0])
    }
    const order = []
    for (let i = 0; i < numCourses; i++) {
        if (visited[i] === 0) {
            if (!_dfs(digraph, visited, i, order)) {
                return []
            }
        }
    }

    const ans = []
    let i = 0
    while (order.length) {
        ans[i++] = order.pop()
    }

    return ans
}

function _dfs(digraph, visited, i, order) {
    if (visited[i] === 1) return false
    if (visited[i] === 2) return true
    visited[i] = 1
    if (digraph[i]) {
        for (let next of digraph[i]) {
            if (visited[next] === 1) return false
            if (visited[next] === 0) {
                if (!_dfs(digraph, visited, next, order)) return false
            }
        }
    }
    visited[i] = 2
    order.push(i)
    return true
}

function bfs(numCourses, prerequisites) {
    const queue = []
    const digraph = []
    const ans = []
    const degree = Array(numCourses).fill(0)
    for (let pre of prerequisites) {
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
        ans.push(cur)
        if (digraph[cur]) {
            for (let next of digraph[cur]) {
                if (--degree[next] === 0) {
                    queue.push(next)
                }
            }
        }
    }

    return ans.length === numCourses ? ans : []
}


const numCourses = 2, prerequisites = [[0,1],[1,0]]
const res = findOrder(numCourses, prerequisites)
console.log(res)