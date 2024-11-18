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
 * @return {number[][]}
 */
var pathSum = function(root, targetSum) {
    const ans = []
    const dfs = function(node, path, acc, target) {
        if (node === null) return
        path.push(node.val)
        if (node.left === null && node.right === null && acc + node.val === target) {
            ans.push(path.slice())
        }
        dfs(node.left, path, acc + node.val, target)
        dfs(node.right, path, acc + node.val, target)
        path.pop()
    }
    dfs(root, [], 0, targetSum)
    return ans
};