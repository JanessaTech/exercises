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
    const dfs = function(node, acc, path) {
     if (!node) return
     path.push(node.val)
     if (!node.left && !node.right) {
         if (acc + node.val === targetSum) ans.push(path.slice())
     }
     dfs(node.left, acc + node.val, path)
     dfs(node.right, acc + node.val, path)
     path.pop()
    }
 
    dfs(root, 0, [])
    return ans
 };