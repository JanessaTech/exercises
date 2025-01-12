/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestBridge = function(grid) {
    const n = grid.length
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    const queue = []

    const init = function() {
        const visited = []
        for (let i = 0; i < n; i++) {
            visited.push(Array(n).fill(false))
        }
        return visited
    }
    const getStarter = function() {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (grid[i][j] === 1) return [i, j]
            }
        }
    }

    const dfs = function(i, j, visited){
        visited[i][j] = true
        queue.push([i, j])
        grid[i][j] = 2
        for (let dir of dirs) {
            const nr = dir[0] + i
            const nc = dir[1] + j
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc] && grid[nr][nc] === 1) {
                dfs(nr, nc, visited)
            }
        }
    }


    const starter = getStarter()
    const visited = init()
    let level = 0
    dfs(starter[0], starter[1], visited)

    while (queue.length) {
        const size = queue.length
        for (let i = 0; i < size; i++) {
            const [row, col] = queue.shift()
            if (grid[row][col] === 1) return level - 1
            for (let dir of dirs) {
                const nr = dir[0] + row
                const nc = dir[1] + col
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc]) {
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
