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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function(root, subRoot) {
    if (root === null && subRoot === null) return true
    if (root !== null && subRoot === null) return true
    if (root === null && subRoot !== null) return false
    if (isSame(root, subRoot)) return true
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot) 
    
};

function isSame(p, q) {
    if (p === null && q === null) return true
    if ((p === null && q !== null) || (p !== null && q === null)) return false
    if (p.val !== q.val) return false
    return isSame(p.left, q.left) && isSame(p.right, q.right)
}