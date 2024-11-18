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
var minDepth = function(root) {
    const dfs = function(node) {
        if(!node) return 0
        const left = dfs(node.left)
        const right = dfs(node.right)
        var min = 0
        if (left &&right) {
            min = Math.min(left, right)
        } else {
            min = left ? left : right
        }
        return min + 1
    }

    return dfs(root)
};