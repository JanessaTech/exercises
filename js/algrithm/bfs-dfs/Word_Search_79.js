/*
var exist = function(board, word) {
    
    const initVisited = function() {
        const res = []
        for (let i = 0; i < board.length; i++) {
            res.push(Array(board[0].length).fill(false))
        }
        return res
    }
    const resetVisited = function(visited) {
        for (let i = 0; i < visited.length; i++) {
            for (let j = 0; j < visited[0].length; j++) {
                visited[i][j] = false
            }
        }
    }
    const findChar = function(ch) {
        const res = []
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                if (board[i][j] === ch) {
                    res.push([i, j])
                }
            }
        }
        return res
    }
    const isValid = function(row, col) {
        if (row < 0 || row >= board.length) return false
        if (col < 0 || col >= board[0].length) return false
        return true
    }

    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]
    const visited = initVisited()

    const dfs = function(row, col, level) {
        const target = word.charAt(level)
        const cur = board[row][col]
        if (cur === target) {
            if (level === word.length - 1) return true
            for (let i = 0; i < dirs.length; i++) {
                const dir = dirs[i]
                const nr = row + dir[0]
                const nc = col + dir[1]
                if (isValid(nr, nc) && !visited[nr][nc]) {
                    visited[nr][nc] = true
                    if (dfs(nr, nc, level + 1)) {
                        return true
                    }
                    visited[nr][nc] = false
                }
            }
            return false
        } else {
            return false
        }
    }

    const first = word.charAt(0)
    const firsts = findChar(first)

    for(let first of firsts) {
        visited[first[0]][first[1]] = true
        const find = dfs(first[0], first[1], 0)
        if (find) return true
        resetVisited(visited)
    }
    return false
};

const board = [["a"]]
const word = "a"

const res  = exist(board, word)
console.log('res = ', res) */

var exist = function(board, word) {
    const getFirst = function() {
        const first = word.charAt(0)
        const ans = []
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                if (board[i][j] === first) {
                    ans.push([i, j])
                }
            }
        }
        return ans
    }

    const iniVisited = function() {
        const visited = []
        for (let i = 0; i < board.length; i++) {
            visited.push(Array(board[0].length).fill(false))
        }
        return visited
    }

    const resetVisited = function(visited) {
        for (let i = 0; i < visited.length; i ++) {
            for (let j = 0; j < visited[0].length; j++) {
                visited[i][j] = false
            }
        }
    }

    const isValid = function(row, col) {
        if (row < 0 || row >= board.length) return false
        if (col < 0 || col >= board[0].length) return false
        return true
    }

    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]
    var found = false

    const dfs = function(row, col, pos) {
        const cur = board[row][col]
        const target = word.charAt(pos)
        if (cur === target) {
            if (pos === word.length - 1) {
                found = true
                return
            }
            visited[row][col] = true
            for (const dir of dirs) {
                const nr = row + dir[0]
                const nc = col + dir[1]
                if (isValid(nr, nc) && !visited[nr][nc]) {
                    if (!found) {
                        dfs(nr, nc, pos + 1)
                    }
                    
                }
            }
            visited[row][col] = false
        }
    }
    
    const firsts = getFirst()
    const visited = iniVisited()
    for (let first of firsts) {
        dfs(first[0], first[1], 0)
        if (!found) {
            resetVisited(visited)
        }
    }
    return found
};


const board = [["A","B","C","E"],
               ["S","F","C","S"],
               ["A","D","E","E"]]
const word = "SEE"

const res  = exist(board, word)
console.log('res = ', res)