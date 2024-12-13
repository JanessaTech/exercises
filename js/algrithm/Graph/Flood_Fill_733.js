/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFill = function(image, sr, sc, color) {
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    const m = image.length
    const n = image[0].length
    const visited = []
    for (let i = 0; i < m; i++) {
        visited.push(Array(n).fill(false))
    }

    const dfs = function(image, i, j, color, visited, origin) {
        visited[i][j] = true
        image[i][j] = color
        for (let dir of dirs) {
            let nr = dir[0] + i
            let nc = dir[1] + j
            if (nr >=0 && nr < m && nc >=0 && nc < n && !visited[nr][nc] && image[nr][nc] === origin) {
                dfs(image, nr, nc, color, visited, origin)
            }
        }
    }

    dfs(image, sr, sc, color, visited, image[sr][sc])

    return image
};
const image =  [[1,1,1],[1,1,0],[1,0,1]]
const res = floodFill(image, 1, 1, 2)
console.log(res)
