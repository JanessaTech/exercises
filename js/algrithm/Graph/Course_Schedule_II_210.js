/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(numCourses, prerequisites) {
    const ans = bfs(numCourses, prerequisites)
    return ans
};

function dfs(numCourses, prerequisites) {

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


const numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
const res = findOrder(numCourses, prerequisites)
console.log(res)