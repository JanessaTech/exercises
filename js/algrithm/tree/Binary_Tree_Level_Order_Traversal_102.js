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
    if (root !== null) queue.push(root)

    while (queue.length > 0) {
        const size = queue.length
        const subAns = []
        for (let i = 0; i < size; i++) {
            const cur = queue.shift()
            subAns.push(cur.val)
            if (cur.left) {
                queue.push(cur.left)
            }
            if (cur.right) {
                queue.push(cur.right)
            }
        }
        ans.push(subAns)
    }
    return ans
};