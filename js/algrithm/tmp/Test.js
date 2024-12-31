/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    const m = grid.length
    const n = grid[0].length
    const visited = []
    for (let i = 0; i < m; i++) {
        visited.push(Array(n).fill(false))
    }
    let area = 0

    const dfs = function(grid, i, j, visited) {
        visited[i][j] = true
        area++
        for (let dir of dirs) {
            let nr = dir[0] + i
            let nc = dir[1] + j
            if (nr >=0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc] && grid[nr][nc] === 1) {
                dfs(grid, nr, nc, visited)
            }
        }
    }


    let max = 0
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (!visited[i][j] && grid[i][j] === 1) {
                dfs(grid, i, j, visited)
                if (area > max) {
                    max = area
                }
                area = 0
            }
        }
    }
    return max

};
const grid = [[1],[1]]
const res = maxAreaOfIsland(grid)
console.log(res)
