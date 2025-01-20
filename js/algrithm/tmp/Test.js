var findOrder = function(numCourses, prerequisites) {
    const res = dfs(numCourses, prerequisites)
    return res
};

function dfs(numCourses, prerequisites) {
    const digraph = []
    for (let pre of prerequisites) {
        if (!digraph[pre[1]]) digraph[pre[1]] = []
        digraph[pre[1]].push(pre[0])
    }
    const visited = Array(numCourses).fill(0)
    const order = []
    const ans = []
    for (let i = 0; i < numCourses; i++) {
        if (visited[i] === 0) {
            if (!_dfs(digraph, i, visited, order)) return []
        }
    }

    while (order.length) {
        ans.push(order.pop())
    }
    return ans
}


function _dfs(digraph, i, visited, order) {
    if (visited[i] === 1) return false
    if (visited[i] === 2) return true
    visited[i] = 1
    if (digraph[i]) {
        for (let next of digraph[i]) {
            if (visited[next] === 1) return false
            if (visited[next] === 0) {
                if (!_dfs(digraph, next, visited, order)) return false
            }
        }
    }
    visited[i] = 2
    order.push(i)
    return true
}

const numCourses = 2, prerequisites = [[1,0]]
const res = findOrder(numCourses, prerequisites)
console.log(res)
