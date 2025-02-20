var canVisitAllRooms = function(rooms) {
    const n = rooms.length
    const visited = Array(n).fill(false)
    const dfs = function(i, visited) {
     visited[i] = true
     for (let next of rooms[i]) {
         if (!visited[next]) dfs(next, visited)
     }
    }
 
    dfs(0, visited)
    return visited.filter(v => !v).length === 0
 };