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
 * @return {number}
 */
var sumNumbers = function(root) {
    const stack = []
    const calc = function(path) {
        var s = 0
        for (let i = 0; i < path.length; i++) {
            s = s * 10 + path[i]
        }
        return s
    }
    const dfs = function(node, path) {
        if (node === null) return 
        path.push(node.val)
        if (node.left === null && node.right === null) {
            const num = calc(path)
            stack.push(num)
        }
        dfs(node.left, path)
        dfs(node.right, path)
        path.pop()
    }
    dfs(root, [])
    var sum = 0
    while (stack.length) {
        sum += stack.pop()
    }
    return sum  
};