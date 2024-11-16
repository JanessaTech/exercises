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
var postorderTraversal = function(root) {
    /*const ans = []
    const dfs = function(node) {
        if (node) {
            dfs(node.left)
            dfs(node.right)
            ans.push(node.val)
        }
    }
    dfs(root)
    return ans*/

    const ans = []
    const stack = []
    var cur = root
    while (cur) {
        ans.push(cur.val)
        stack.push(cur)
        cur = cur.right
    }
    while (stack.length) {
        cur = stack.pop()
        if (cur.left) {
            cur = cur.left
            while (cur) {
                ans.push(cur.val)
                stack.push(cur)
                cur = cur.right
            }
        }
    }

    return ans.reverse()
    
};