/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function(rooms) {
    const n = rooms.length
    const visited = Array(n).fill(false)

    const dfs = function(rooms, i, visited) {
        visited[i] = true
        for (let next of rooms[i]) {
            if (!visited[next]) {
                dfs(rooms, next, visited)
            }
        }
    }

    dfs(rooms, 0, visited)

    return visited.filter(val => val === false).length === 0 
};