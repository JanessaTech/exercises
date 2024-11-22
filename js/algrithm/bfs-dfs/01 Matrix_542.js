/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function(mat) {
    const init = function() {
        const visited = []
        const dist = []
        for (let i = 0; i < mat.length; i++) {
            visited.push(Array(mat[0].length).fill(false))
            dist.push(Array(mat[0].length).fill(0))
        }
        return [visited, dist]
    }
    const queue = []
    const [visited, dist] = init()
    for (let i = 0; i < mat.length; i++) {
        for (let j = 0; j < mat[0].length; j++) {
            if (mat[i][j] === 0) {
                queue.push([i, j])
                visited[i][j] = true
            }
        }
    }
    var level = 0
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]

    while (queue.length) {
        const size = queue.length
        for (let i = 0; i < size; i++) {
            const cur = queue.shift()
            dist[cur[0]][cur[1]] = level
            for (const dir of dirs) {
                const nr = cur[0] + dir[0]
                const nc = cur[1] + dir[1]
                if (nr >= 0 && nr <mat.length && nc >=0 && nc <mat[0].length && !visited[nr][nc]) {
                    queue.push([nr, nc])
                    visited[nr][nc] = true
                }
            }
        }
        level++
    }
    return dist
    
};

const mat = [[0,0,0],
             [0,1,0],
             [0,0,0]]

const res = updateMatrix(mat)
console.log(res)