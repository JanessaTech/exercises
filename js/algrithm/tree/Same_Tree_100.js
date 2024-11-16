/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    if (!q && !p) return true
    if ((!p && q) || (p && !q)) return false
    if (p && q && q.val !== p.val) return false
    const left = isSameTree(p.left, q.left)
    const right = isSameTree(p.right, q.right)
    return left && right
};