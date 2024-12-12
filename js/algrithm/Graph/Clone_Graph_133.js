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
    const visited = new Map([])
    const clone = function(node) {
        if (node === null) return null
        const clonedNode = new _Node(node.val)
        visited.set(node.val, clonedNode)
        for (neighbor of node.neighbors) {
            let clonedNeighbor = undefined
            if (visited.has(neighbor.val)) {
                clonedNeighbor = visited.get(neighbor.val)
            } else {
                clonedNeighbor = clone(neighbor)
            }
            clonedNode.neighbors.push(clonedNeighbor)
        }
        return clonedNode
    }

    const copy = clone(node)
    return copy 
};