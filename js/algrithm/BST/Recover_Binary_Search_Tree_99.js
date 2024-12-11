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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var recoverTree = function(root) {
    let pre = null
    let first = null
    let second = null

    const dfs = function(node) {
        if (node === null) return
        dfs(node.left)
        if (pre && pre.val > node.val) {
            if (!first) {
                first = pre
            }
            second = node
        }
        pre = node
        dfs(node.right)
    }

    const swap = function(first, second) {
        const tmp = first.val
        first.val = second.val
        second.val = tmp
    }

    dfs(root)
    swap(first, second)
};