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
var levelOrder = function(root) {
    if (!root) return
    if (!res[level]) res[level] = []
    res[level].push(root.val)
    for (let child of root.children) {
        levelOrder(child, res, level + 1)
    }
    return res
};