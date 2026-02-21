/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    if (preorder.length === 0 || inorder.length === 0) return null
    const val = preorder.shift()
    const node = new TreeNode(val)
    const [p1, p2] = split(inorder, val)
    node.left = buildTree(preorder, p1)
    node.right = buildTree(preorder, p2)
    return node
};

function split(inorder, p) {
    const idx = inorder.indexOf(p)
    return [inorder.slice(0, idx), inorder.slice(idx + 1)]
}