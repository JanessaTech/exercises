/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function(grid) {
    const m = grid.length
    const n = grid[0].length
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    const visited = []
    for (let i = 0; i < m; i++) {
        visited.push(Array(n).fill(false))
    }
    const queue = []
    let goods = 0
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 2) {
                queue.push([i, j])
                visited[i][j] = true
            }
            if (grid[i][j] === 1) goods++
        }
    }

    let rotted = 0
    let minutes = 0
    while (queue.length) {
        const size = queue.length
        for (let i = 0; i < size; i++) {
            const [row, col] = queue.shift()
            for (let dir of dirs) {
                const nr = row + dir[0]
                const nc = col + dir[1]
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc] && grid[nr][nc] === 1) {
                    queue.push([nr, nc])
                    visited[nr][nc] = true
                    rotted++
                }
            }
        }
        minutes++
    }

    return rotted === goods ? Math.max(minutes - 1, 0) : -1
};