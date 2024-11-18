/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function(root1, root2) {
    const seq1 = []
    const seq2 = []
    const isLeaf = function(node) {
        return !node.left && !node.right
    }
    const dfs = function(node, seq) {
        if (!node) return
        if (isLeaf(node)) seq.push(node.val)
        dfs(node.left, seq)
        dfs(node.right, seq)
    }
    dfs(root1, seq1)
    dfs(root2, seq2)
    if (seq1.length != seq2.length) return false
    for (let i = 0; i < seq1.length; i++) {
        if (seq1[i] !== seq2[i]) return false
    }
    return true
    
};