/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    const m = grid.length
    const n = grid[0].length
    const visited = []
    for (let i = 0; i < m; i++) {
        visited.push(Array(n).fill(false))
    }

    const dfs = function(grid, i, j, visited) {
        visited[i][j] = true
        for (let dir of dirs) {
            let nr = dir[0] + i
            let nc = dir[1] + j
            if (nr >=0 && nr < m && nc >=0 && nc < n && !visited[nr][nc] && grid[nr][nc] === "1") {
                dfs(grid, nr, nc, visited)
            }
        }
    }


    let cnt = 0
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (!visited[i][j] && grid[i][j] === "1") {
                dfs(grid, i, j, visited)
                cnt++
            }
        }
    }

    return cnt
};

