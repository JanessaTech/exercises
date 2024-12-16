/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    const res = bfs(numCourses, prerequisites)
    return res
};

function bfs(numCourses, prerequisites) {
    const queue = []
    const digraph = new Map()
    const degree = Array(numCourses).fill(0)
    let cnt = 0

    for (let pre of prerequisites) {
        if (!digraph.has(pre[1])) {
            digraph.set(pre[1], [])
        }
        digraph.get(pre[1]).push(pre[0])
        degree[pre[0]]++
    }
    for (let i = 0; i < numCourses; i++) {
        if(degree[i] === 0) {
            queue.push(i)
        }
    }

    while (queue.length) {
        const cur = queue.shift()
        if (digraph.get(cur)) {
            for (const next of digraph.get(cur)) {
                if (--degree[next] === 0) {
                    queue.push(next)
                }
            }
        }
        cnt++  
    }

    return cnt === numCourses
}