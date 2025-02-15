/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    let pathP = undefined
    let pathQ = undefined
    const dfs = function(node, path) {
        if (!node) return 
        path.push(node)
        if (node === p) pathP = path.slice()
        if (node === q) pathQ = path.slice()
        dfs(node.left, path)
        dfs(node.right, path)
        path.pop()
    }
    dfs(root, [])

    let ans = undefined
    for (let i = 0; i < Math.min(pathP.length, pathQ.length); i++) {
        if (pathP[i] === pathQ[i]) {
            ans = pathP[i]
        } else {break}
    }
    return ans
};