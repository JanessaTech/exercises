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
 * @return {boolean}
 */
var isBalanced = function(root) {
    let isBalanced = true
    const dfs = function(node) {
      if (!node) return -1
      const left = dfs(node.left)
      const right = dfs(node.right)
      if (Math.abs(left - right) > 1) isBalanced = false
      return Math.max(left, right) + 1
    }  
    dfs(root)
    return isBalanced
  };