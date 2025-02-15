var goodNodes = function(root) {
    let cnt = 0
    const dfs = function(node, max) {
        if (!node) return
        if (node.val >= max){
            max = node.val
            cnt++
        }
        dfs(node.left, max)
        dfs(node.right, max)
    }

    dfs(root, -Infinity)
    return cnt
};