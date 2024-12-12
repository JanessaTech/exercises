/**
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {_Node} node
 * @return {_Node}
 */
var cloneGraph = function(node) {
    const visited = new Map()
    //const copy = dfs(node, visited)
    const copy = bfs(node)
    return copy
};

function dfs(node, visited) {
    if (node === null) return null
    const newNode = new _Node(node.val)
    visited.set(node.val, newNode)
    for (let neighbor of node.neighbors) {
        let clonedNeighbor = undefined
        if (visited.has(neighbor.val)) {
            clonedNeighbor = visited.get(neighbor.val)
        } else {
            clonedNeighbor = dfs(neighbor, visited)
        }
        newNode.neighbors.push(clonedNeighbor)
    }
    return newNode
}

function bfs(node) {
    if (!node) return null
    const visited = new Map()
    const queue = []
    queue.push(node)
    const copy = new _Node(node.val)
    visited.set(node.val, copy)

    while (queue.length > 0) {
        const cur = queue.pop()
        for (let neighbor of cur.neighbors) {
            let clonedNeighbor = undefined
            if (visited.has(neighbor.val)) {
                clonedNeighbor = visited.get(neighbor.val)
            } else {
                clonedNeighbor = new _Node(neighbor.val)
                visited.set(neighbor.val, clonedNeighbor)
                queue.push(neighbor)
            }
            visited.get(cur.val).neighbors.push(clonedNeighbor)
        }
    }
    return copy
}