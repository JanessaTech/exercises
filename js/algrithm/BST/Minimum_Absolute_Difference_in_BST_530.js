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
    let min = 1e5
    let pre = null
    const dfs = function(node) {
        if (node === null) return
        dfs(node.left)
        if (pre) {
            const diff = node.val - pre.val
            if (Math.abs(diff) < min) {
                min = Math.abs(diff)
            }
        }
        pre = node
        dfs(node.right)
    }

    dfs(root)

    return min
};