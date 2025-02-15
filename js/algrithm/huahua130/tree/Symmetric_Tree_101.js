/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
    const isMirror = function(p, q) {
        if (!p && !q) return true
        if ((p && !q) || (!p && q)) return false
        if (p && q && p.val !== q.val) return false
        const outer = isMirror(p.left, q.right)
        const iner = isMirror(p.right, q.left)
        return outer && iner
    }
    const res = isMirror(root.left, root.right)
    return res
};