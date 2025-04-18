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
var inorderTraversal = function(root) {
    /*
    const ans = []
    var dfs = function(n) {
        if (!n) return
        dfs(n.left)
        ans.push(n.val)
        dfs(n.right)
    }
    dfs(root)
    return ans*/

    const ans = []
    const stack = []
    var cur = root
    while (cur) {
        stack.push(cur)
        cur = cur.left
    }
    while (stack.length) {
        cur = stack.pop()
        ans.push(cur.val)
        cur = cur.right
        while (cur) {
            stack.push(cur)
            cur = cur.left
        }
    }
    return ans
};