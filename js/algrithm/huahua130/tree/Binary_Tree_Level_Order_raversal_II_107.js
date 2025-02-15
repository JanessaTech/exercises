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
var levelOrderBottom = function(root) {
    const ans = []
    if (!root) return ans
    const queue = []
    const stack = []
    queue.push(root)
    while (queue.length) {
        const size = queue.length
        const sub = []
        for (let i = 0; i < size; i++) {
            const cur = queue.shift()
            sub.push(cur.val)
            if (cur.left) {
                queue.push(cur.left)
            }
            if (cur.right) {
                queue.push(cur.right)
            }
        }
        stack.push(sub)
    }
    while (stack.length) {
        ans.push(stack.pop())
    }
    return ans
};