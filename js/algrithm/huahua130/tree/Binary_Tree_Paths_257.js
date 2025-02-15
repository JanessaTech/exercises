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
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
    const ans = []
    const dfs = function(node, path) {
        if (!node) return
        path.push(node.val)
        if (node.left === null && node.right === null) {
            ans.push(path.join('->'))
        } else {
            dfs(node.left, path)
            dfs(node.right, path)
        }
        path.pop()
    }
    dfs(root, [])
    return ans
};