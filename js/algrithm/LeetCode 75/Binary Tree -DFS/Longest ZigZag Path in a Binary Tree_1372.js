var longestZigZag = function(root) {
    let max = 0
    const dfs = function(node, dir1, acc1, dir2, acc2) {
        if (!node) return
        max = Math.max(max, acc1 - 1)
        max = Math.max(max, acc2 - 1)
        dfs(node.left, -1 * dir1, dir1 === -1 ? acc1 + 1 : 1, -1 * dir2, dir2 === -1 ? acc2 + 1 : 1)
        dfs(node.right, -1 * dir1, dir1 === 1 ? acc1 + 1: 1, -1 * dir2, dir2 === 1 ? acc2 + 1: 1)
    }

    dfs(root, -1, 1, 1, 1)
    return max
};