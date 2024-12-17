/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function(equations, values, queries) {
    const n = equations.length
    const graph = createGraph(equations, values)
    const ans = Array(queries.length).fill(-1)
    
    for (let i = 0; i < queries.length; i++) {
        const query = queries[i]
        const src = query[0]
        const dest = query[1]
        const visited = new Set()
        ans[i] = dfs(graph, src, dest, visited, 1)
    }

    return ans
};

function createGraph(equations, values) {
    const graph = new Map()
    for (let i = 0; i < equations.length; i++) {
        const a = equations[i][0]
        const b = equations[i][1]
        const val = values[i]
        if (!graph.has(a)) {
            graph.set(a, [])
        }
        if (!graph.has(b)) {
            graph.set(b, [])
        }
        graph.get(a).push([b, val])
        graph.get(b).push([a, 1/ val])
    }
    return graph
}

function dfs(graph, src, dest, visited, weight) {
    if (!graph.has(src)) return -1
    if (src === dest) return weight
    visited.add(src)
    for(let [next, val] of graph.get(src)) {
        if (!visited.has(next)) {
            const res = dfs(graph, next, dest, visited, weight * val)
            if (res !== -1) return res
        }
    }
    return -1
}

const equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
const res = calcEquation(equations, values, queries)
console.log(res)