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
    var flag = false
    const dfs = function(node, acc, target) {
        if (node === null) return
        if (node.left === null && node.right === null && acc + node.val === target) {
            flag = true
        }
        dfs(node.left, acc + node.val, target)
        dfs(node.right, acc + node.val, target)
    }
    dfs(root, 0, targetSum)
    return flag
};