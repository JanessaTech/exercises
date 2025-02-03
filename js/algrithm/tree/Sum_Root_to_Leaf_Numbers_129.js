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
    var sumNumbers = function(root) {
        const paths = []
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
    
        const calc = function(path) {
            let sum = 0
            for (let p of path) {
                sum = sum * 10 + p
            }
            return sum
        }
    
        dfs(root, [])
    
        let sum = 0
        for (let path of paths) {
            sum += calc(path)
        }
        return sum
    }  
};