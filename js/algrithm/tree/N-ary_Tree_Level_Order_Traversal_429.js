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
    const ans = []
    if (!root) return ans
    const queue = []
    queue.push(root)
    var level = 0
    while (queue.length) {
        const size = queue.length
        const sub = []
        for (let i = 0; i < size; i++) {
            const cur = queue.shift()
            sub.push(cur.val)
            for (let child of cur.children) {
                if (child) {
                    queue.push(child)
                }
            }
        }
        ans[level] = sub
        level++
    }
    return ans
}