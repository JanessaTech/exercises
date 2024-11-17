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
    const dfs = function(node, depth) {
        if (!node) return depth
        const left = node.left ? dfs(node.left) : 0
        const right = node.right ? dfs(node.right) : 0
        return Math.max(left, right) + 1;
    }
    const res = dfs(root, 0)
    return res 
};