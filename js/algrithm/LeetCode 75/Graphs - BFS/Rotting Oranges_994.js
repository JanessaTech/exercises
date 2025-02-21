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
    let nonempty = 0
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 2) {
                queue.push([i, j])
                visited[i][j] = true
                nonempty++
            }
            if (grid[i][j] === 1) nonempty++
        }
    }

    let minutes = 0
    let cnt = 0
    while (queue.length) {
        const size = queue.length
        for (let i = 0; i < size; i++) {
            const [row, col] = queue.shift()
            cnt++
            for (let dir of dirs) {
                const nr = row + dir[0]
                const nc = col + dir[1]
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc] && grid[nr][nc] === 1) {
                    queue.push([nr, nc])
                    visited[nr][nc] = true
                }
            }
        }
        minutes++
    }

    return cnt === nonempty ? Math.max(minutes - 1, 0) : -1
};