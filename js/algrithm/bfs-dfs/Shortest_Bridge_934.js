/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestBridge = function(grid) {
    const init = function() {
        const visited = []
        for (let i = 0; i < grid.length; i++) {
            visited.push(Array(grid[0].length).fill(false))
        }
        return visited
    }
    
    const isValid = function(row, col) {
        if(row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) return false
        return true
    }

    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]
    const [visited] = init()
    var found = false

    const dfs = function(row, col, visited) {
        if (!isValid(row, col) || visited[row][col] || grid[row][col] !== 1) return
        visited[row][col] = true
        grid[row][col] = 2
        for (const dir of dirs) {
            const nr = row + dir[0]
            const nc = col + dir[1]
            dfs(nr, nc, visited)
        }
    }

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 1 && !found) {
                dfs(i, j, visited)
                found = true
            }
        }
    }

    const queue = []
    var level = 0
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 2) {
                queue.push([i, j])
                visited[i][j] = true
            }
        }
    }

    while (queue.length) {
        const size = queue.length
        for (let i = 0; i < size; i++) {
            const cur = queue.shift()
            if (grid[cur[0]][cur[1]] === 1) {
                return level - 1
            }
            for (const dir of dirs) {
                const nr = cur[0] + dir[0]
                const nc = cur[1] + dir[1]
                if (isValid(nr, nc) && !visited[nr][nc]) {
                    queue.push([nr, nc])
                    visited[nr][nc] = true
                }
            }
        }
        level++
    }
    return -1
};

const grid =  [[0,1],
               [1,0]]
const res = shortestBridge(grid)
console.log('res =', res)
