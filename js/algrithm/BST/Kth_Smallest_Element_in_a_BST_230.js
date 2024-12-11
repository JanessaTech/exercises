
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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
    let index = 0
    let ans = undefined
    const dfs = function(node) {
        if (node === null) return
        dfs(node.left)
        index++
        if (index === k) {
            ans = node.val
            return
        }
        dfs(node.right)
    }

    dfs(root)

    return ans
    
};