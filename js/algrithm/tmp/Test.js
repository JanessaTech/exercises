var exist = function(board, word) {
    const m = board.length
    const n = board[0].length
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]]

    const init = function() {
        const visited = []
        for (let i = 0; i < m; i++) {
            visited.push(Array(n).fill(false))
        }
        return visited
    }
    const reset = function(visited) {
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                visited[i][j] = true
            }
        }
    }

    const getStarters = function(ch) {
        const ans = []
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (board[i][j] === ch){
                    ans.push([i, j])
                }
            }
        }
        return ans
    }

    const dfs = function(i, j, pos, visited) {
        if (pos === word.length) return true
        const target = word.charAt(pos)
        const cur = board[i][j]
        if (target === cur) return true
        visited[i][j] = true
        for (let dir of dirs) {
            let nr = dir[0] + i
            let nc = dir[1] + j
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc]) {
                if (dfs(nr, nc, pos + 1, visited)) return true
            }
        }
        visited[i][j] = false
        return false
    }

    const starters = getStarters(word.charAt(0))
    for (let starter of starters) {
        const visited = init()
        if (dfs(starter[0], starter[1], 0, visited)) return true  
    }

    return false
    
};

const board = [["a"]]
const word = "a"
const res = exist(board, word)
console.log(res)