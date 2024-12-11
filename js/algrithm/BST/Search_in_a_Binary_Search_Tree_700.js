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
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function(root, val) {

    const dfs = function(node, val) {
        if (!node) return null
        if (node.val === val) {
            return node
        } else if (node.val > val) {
            return dfs(node.left, val)
        } else {
            return dfs(node.right, val)
        }
    }

    const ret = dfs(root, val)
    return ret
};