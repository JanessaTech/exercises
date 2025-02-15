var maxDepth = function(root) {
    const dfs = function(node) {
        if (!node) return 0
        const left = dfs(node.left)
        const right = dfs(node.right)
        return Math.max(left, right) + 1
    }
    
    return dfs(root)
};