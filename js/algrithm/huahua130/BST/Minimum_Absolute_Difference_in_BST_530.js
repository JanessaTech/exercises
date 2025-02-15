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
var getMinimumDifference = function(root) {
    let min = Infinity
    let pre = undefined
    const dfs = function(node) {
        if (!node) return
        dfs(node.left)
        if (pre) {
            const abs = Math.abs(pre.val - node.val)
            min = Math.min(min, abs)
        }
        pre = node
        dfs(node.right)
    }
    dfs(root)
    return min
};