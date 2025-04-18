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
var deepestLeavesSum = function(root) {
    let sum = 0
    const queue = []
    queue.push(root)

    while (queue.length) {
        const size = queue.length
        sum = 0
        for (let i = 0; i < size; i++) {
            const cur = queue.shift()
            sum += cur.val
            if (cur.left) queue.push(cur.left)
            if (cur.right) queue.push(cur.right)
        }
    }
    return sum
    
};