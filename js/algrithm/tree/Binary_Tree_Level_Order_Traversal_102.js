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
 * @return {number[][]}
 */
var levelOrder = function(root) {
    const ans = []
    const queue = []
    if (!root) return ans
    queue.push(root)
    var level = 0
    while (queue.length) {
        const size = queue.length
        ans[level] = []
        for (let i = 0; i < size; i++) {
            const cur = queue.shift()
            ans[level].push(cur.val)
            if (cur.left) {
                queue.push(cur.left)
            } 
            if (cur.right) {
                queue.push(cur.right)
            }
        }
        level++
    }
    return ans
};