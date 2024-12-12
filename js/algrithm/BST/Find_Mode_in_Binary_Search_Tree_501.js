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
 * @return {number[]}
 */
var findMode = function(root) {
    let cnt = 0
    let max = 0
    let pre = null
    let modes = []

    const dfs = function(node) {
        if (node === null) return
        dfs(node.left)
        cnt = node.val === pre?.val ? cnt + 1: 1
        if (cnt === max) {
            modes.push(node.val)
        } else if (cnt > max) {
            max = cnt
            modes = [node.val]
        }
        pre = node
        dfs(node.right)
    }

    dfs(root)

    return modes
};