/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxDistance = function(grid) {
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    const n = grid.length
    const queue = []
    const visited = []
    for ( let i = 0; i < n; i++) {
        visited.push(Array(n).fill(false))
    }
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n;j++) {
            if (grid[i][j] === 1) {
                queue.push([i, j])
                visited[i][j] = true
            }
        }
    }

    let level = -1
    while (queue.length > 0) {
        let size = queue.length
        for (let k = 0; k < size; k++) {
            let cur = queue.shift()
            for (let dir of dirs) {
                let nr = dir[0] + cur[0]
                let nc = dir[1] + cur[1]
                if (nr >=0 && nr < n && nc >=0 && nc < n && !visited[nr][nc]) {
                    queue.push([nr, nc])
                    visited[nr][nc] = true
                }
            }
        }
        level++
    }

    return level <= 0 ? -1 : level
    
}