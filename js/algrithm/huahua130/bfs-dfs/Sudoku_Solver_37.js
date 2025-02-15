/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(board) {
    const isValid = function(row, col, k) {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === k) return false
        }
        for (let j = 0; j < 9; j++) {
            if (board[j][col] === k) return false
        }
        const si = Math.floor(row / 3) * 3
        const sj = Math.floor(col / 3) * 3
        for (let i = si; i < si + 3; i++) {
            for (let j = sj; j < sj + 3; j++) {
                if (board[i][j] === k) return false 
            }
        }
        return true
    }

    const dfs = function(row, col) {
        if (row === 9) return true
        if (col === 9) {
            return dfs(row + 1, 0)
        }
        const ch = board[row][col]
        if (ch === '.') {
            for (let i = 1; i <= 9; i++) {
                if (isValid(row, col, i + '')) {
                    board[row][col] = i + ''
                    if (dfs(row, col)) {
                        return true
                    }
                    board[row][col] = '.'
                }
            }
        } else {
            return dfs(row, col + 1)
        }
        return false

    }
    dfs(0, 0)
};


/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku1 = function(board) {
    const isValid = function(row, col, k) {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === k) return false
        }
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === k) return false
        }
        const si = Math.floor(row / 3) * 3
        const sj = Math.floor(col /3) * 3
        for (let i = si; i < si + 3; i++) {
            for (let j = sj; j < sj + 3; j++) {
                if (board[i][j] === k) return false
            }
        }
        return true
    }

    const dfs = function(row, col) {
        if (row === 9) return true
        if (col === 9) {
            return dfs(row + 1, 0)
        }
        const ch = board[row][col]
        if (ch === '.') {
            for (let i = 1; i <= 9; i++) {
                if (isValid(row, col, i + '')) {
                    board[row][col] = i + ''
                    if (dfs(row, col + 1)) {
                        return true
                    }
                    board[row][col] = '.'
                }
            }
        } else {
            return dfs(row, col + 1)
        }
        return false
    }

    dfs(0, 0)
};
const board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
solveSudoku1(board)
console.log(board)