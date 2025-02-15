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
var longestUnivaluePath = function(root) {
    var max = 0
    const dfs = function(node) {
        if (!node) return 0
        const left = dfs(node.left)
        const right = dfs(node.right)
        var local = 0
        if (!node.left && !node.right) {
            local = 0
        } else if (node.left && !node.right) {
            if (node.val === node.left.val) {
                local = left + 1
                max = Math.max(local, max)
            } else {
                local = 0
            }
        } else if (!node.left && node.right) {
            if (node.val === node.right.val) {
                local = right + 1
                max = Math.max(local, max)
            } else {
                local = 0
            }
        } else {
            if (node.val === node.left.val && node.val === node.right.val) {
                local = Math.max(left, right) + 1
                max = Math.max(left + right + 2, max)
            } else if (node.val === node.left.val) {
                local = left + 1
                max = Math.max(local, max)
            } else if (node.val === node.right.val) {
                local = right + 1
                max = Math.max(local, max)
            } else {
                local = 0
            }
        }
        return local
    }

    dfs(root)

    return max
};