var equalPairs = function(grid) {
    const n = grid.length
    const rowMap = new Map()

    let cnt = 0
    
    for (let r = 0; r < n; r++) {
        row = JSON.stringify(grid[r])
        rowMap.set(row, (rowMap.get(row) || 0) + 1 )
    }
    for (let c = 0; c < n; c++) {
        const col = JSON.stringify(grid.map(r => r[c]))
        cnt += (rowMap.get(col) || 0)
    }

    return cnt
};