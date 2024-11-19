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
var diameterOfBinaryTree = function(root) {
    var max = 0
    const dfs = function(node) {
        if (node.left && node.right) {
            const left = dfs(node.left)
            const right = dfs(node.right)
            if (left + right + 2 > max) {
                max = left + right + 2
            }
            return Math.max(left, right) + 1
        } else if (node.left) {
            const left = dfs(node.left)
            if (left + 1 > max) {
                max = left + 1
            }
            return left + 1
        } else if (node.right) {
            const right = dfs(node.right)
            if (right + 1 > max) {
                max = right + 1
            }
            return right + 1
        } else {
            return 0
        }
    }
    dfs(root)
    return max
};