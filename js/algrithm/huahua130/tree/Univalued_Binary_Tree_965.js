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
 * @return {boolean}
 */
var isUnivalTree = function(root) {
    /*let res = true
    let pre  = undefined
    const dfs = function(node) {
        if (!node) return
        dfs(node.left)
        if (pre) {
            if (pre.val !== node.val) res = false

        }
        pre = node
        if (res) {
            dfs(node.right)
        }
        
    }

    dfs(root)
    return res*/
    const res = bfs(root)
    return res
};

function bfs(node) {
    const queue = []
    if (node) queue.push(node)
    let pre = undefined

    while (queue.length) {
        const size = queue.length
        for (let i = 0; i < size; i++) {
            const cur = queue.shift()
            if (pre) {
                if (pre.val !== cur.val) return false
            }
            if (cur.left) queue.push(cur.left)
            if (cur.right) queue.push(cur.right)
            pre = cur
        }
    }
    return true
}