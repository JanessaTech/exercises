/**
 * @param {character[][]} maze
 * @param {number[]} entrance
 * @return {number}
 */
var nearestExit = function(maze, entrance) {
    const m = maze.length
    const n = maze[0].length
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    const visited = []
    for (let i = 0; i < m; i++) {
        visited.push(Array(n).fill(false))
    }

    const isExit = function(row, col) {
        const isEntrance = (row === entrance[0] && col === entrance[1])
        return !isEntrance && (row === 0 || row === m - 1 || col === n - 1 || col === 0)
    }

    let level = 0
    const queue = [entrance]
    visited[entrance[0]][entrance[1]] = true
    while (queue.length) {
        const size = queue.length
        for (let i = 0; i < size; i++) {
            const [row, col] = queue.shift()
            if (isExit(row, col)) return level
            for (let dir of dirs) {
                const nr = row + dir[0]
                const nc = col + dir[1]
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc] && maze[nr][nc] === '.') {
                    queue.push([nr, nc])
                    visited[nr][nc] = true
                }
            }

        }
        level++
    }
    return -1
};