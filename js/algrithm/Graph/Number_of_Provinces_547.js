/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function(isConnected) {
    const n = isConnected.length
    const visited = Array(n).fill(false)

    const dfs = function(isConnected, i, visited) {
        visited[i] = true
        for (let j = 0; j < n; j++) {
            if (isConnected[i][j] === 1 && !visited[j]) {
                dfs(isConnected, j, visited)
            }
        }
    }

    let cnt= 0
    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs(isConnected, i, visited)
            cnt++
        }
    }
    return cnt
};