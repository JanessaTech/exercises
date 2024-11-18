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
    const paths = []
    const convert = function(path) {
        var str = ''
        for (let i = 0; i < path.length; i++) {
            if (i === path.length - 1) {
                str += path[i]
            } else {
                str += path[i] + '->'
            }
        }
        return str
    }
    const dfs = function(node, path) {
        if (!node) return
        path.push(node.val)
        if (!node.left && !node.right) {
            paths.push(path.slice())
        }
        dfs(node.left, path)
        dfs(node.right, path)
        path.pop()
    }
    dfs(root, [])
    const ans = []
    for (const path of paths) {
        const str = convert(path)
        ans.push(str)
    }
    return ans
};