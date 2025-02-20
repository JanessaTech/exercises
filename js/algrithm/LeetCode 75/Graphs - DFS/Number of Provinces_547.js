var findCircleNum = function(isConnected) {
    const n = isConnected.length
    const visited = Array(n).fill(false)
    let cnt = 0

    const dfs = function(i, visited) {
        visited[i] = true
        for (let j = 0; j < n; j++) {
            if (isConnected[i][j] === 1 && !visited[j]) {
                dfs(j, visited)
            }
        }
    }

    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs(i, visited)
            cnt++
        }
    }

    return cnt
};
