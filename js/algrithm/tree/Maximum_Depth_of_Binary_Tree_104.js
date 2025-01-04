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
 * @return {number}
 */
var maxDepth = function(root) {
    const dfs = function(node) {
        if (!node) return 0
        let left = dfs(node.left)
        let right = dfs(node.right)
        return Math.max(left, right) + 1
    }

    const res = dfs(root)
    return res
};