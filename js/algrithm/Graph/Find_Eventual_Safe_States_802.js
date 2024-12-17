/**
 * @param {number[][]} graph
 * @return {number[]}
 */
var eventualSafeNodes = function(graph) {
    const n = graph.length
    const visited = Array(n).fill(0)
    const ans = []
    for (let i = 0; i < n; i++) {
        if (isSafe(graph, visited, i)) {
            ans.push(i)
        }
    }
    return ans
    
};

function isSafe(graph, visited,i) {
   if (visited[i] === 2) return true
   if (visited[i] === 1) return false
   visited[i] = 1
   for (let next of graph[i]) {
    if (!isSafe(graph, visited, next)) {
        return false
    }
   }
   visited[i] = 2
   return true
}