/**
 * @param {number} n
 * @param {number[][]} paths
 * @return {number[]}
 */
var gardenNoAdj = function(n, paths) {
    const graph = createGraph(n, paths)
    const types = [1, 2, 3, 4]
    const ans = []
    for (let i = 0; i < n; i++) {
        const taken = new Set()
        for (let next of graph[i]) {
            if (ans[next]) taken.add(ans[next])
        }
        ans[i] = types.filter((t) => !taken.has(t))[0]
    }
    return ans
};

function createGraph(n, paths) {
    const graph = Array(n).fill(undefined).map((_, i) => [])
    for (let path of paths) {
        const x = path[0] - 1
        const y = path[1] - 1
        graph[x].push(y)
        graph[y].push(x)
    }
    return graph
}