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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function(root, targetSum) {
    let flag = false
    const dfs = function(node, sum) {
        if (!node) return
        if (!node.left && !node.right) {
            if (sum + node.val === targetSum) flag = true
        }
        dfs(node.left, sum + node.val)
        if (!flag) {
            dfs(node.right, sum + node.val)
        }
    }

    dfs(root, 0)
    return flag
};