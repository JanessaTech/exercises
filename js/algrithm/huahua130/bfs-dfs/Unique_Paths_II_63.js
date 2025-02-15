/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
    const init = function() {
        const memo = []
        for (let i = 0; i < obstacleGrid.length; i++) {
            memo.push(Array(obstacleGrid[0].length).fill(-1))
        }
        return memo
    }
    const isValid = function(i, j) {
        return i >= 0 && i < obstacleGrid.length && j >=0 && j < obstacleGrid[0].length && obstacleGrid[i][j] === 0
    }

    const dfs = function(i, j) {
        if (!isValid(i, j)) return 0
        if (i === obstacleGrid.length - 1 && j === obstacleGrid[0].length - 1) return 1
        if (memo[i][j] !== -1) return memo[i][j]
        memo[i][j] = dfs(i + 1, j) + dfs(i, j + 1)
        return memo[i][j]
    }

    const memo = init()
    const res = dfs(0, 0)
    return res
};