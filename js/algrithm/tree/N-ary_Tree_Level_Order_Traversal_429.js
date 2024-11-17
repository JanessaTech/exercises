/**
 * // Definition for a _Node.
 * function _Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {_Node|null} root
 * @return {number[][]}
 */
/*var levelOrder = function(root, res = [], level = 0) {
    if (!root) return
    if (!res[level]) res[level] = []
    res[level].push(root.val)
    for (let child of root.children) {
        levelOrder(child, res, level + 1)
    }
    return res
    
};*/

var levelOrder = function(root) {
    const res = []
    const queue = []
    var level = 0
    if (!root) return res
    queue.push(root)
    while (queue.length) {
        const size = queue.length
        res[level] = []
        for (let i = 0; i < size; i++) {
            const cur = queue.shift()
            res[level].push(cur.val)
            for (let child of cur.children) {
                if (child) {
                    queue.push(child)
                }
            }
        }
        level++
    }
    return res
}