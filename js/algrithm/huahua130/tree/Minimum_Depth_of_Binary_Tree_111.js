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
var minDepth = function(root) {
    const dfs = function(node) {
        if (!node) return 0
        if (node.left && !node.right) return dfs(node.left) + 1
        if (!node.left && node.right) return dfs(node.right) + 1
        const left = dfs(node.left)
        const right = dfs(node.right)
        return Math.min(left, right) + 1
    }

    //const res = dfs(root)
    const res = bfs(root)

    return res
};

function bfs(root) {
    if (!root) return 0
    const queue = [root]
    let level = 0
    while (queue.length) {
        const size = queue.length
        for (let i = 0; i < size; i++) {
            const cur = queue.shift()
            if (!cur.left && !cur.right) return level + 1
            if (cur.left) queue.push(cur.left)
            if (cur.right) queue.push(cur.right)
        }
        level++
    }
    return -1
}