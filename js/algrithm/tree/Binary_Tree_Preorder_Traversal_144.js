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
var preorderTraversal = function(root) {
    /*const ans = []
    const dfs = function(node) {
        if (node) {
            ans.push(node.val)
            dfs(node.left)
            dfs(node.right)
        }
    }
    dfs(root)
    return ans */

    const ans = []
    const stack = []
    var cur = root
    while (cur) {
        ans.push(cur.val)
        stack.push(cur)
        cur = cur.left
    }
    while (stack.length) {
        cur = stack.pop()
        if (cur.right) {
            cur = cur.right
            while (cur) {
                ans.push(cur.val)
                stack.push(cur)
                cur = cur.left
            }
        }
    }
    return ans
    
};