const pathSum = (root, targetSum) => {
	let cnt = 0
    const map = {}
    const dfs = function(node, acc) {
        if (!node) return
        acc += node.val
        if (acc === targetSum) cnt++
        if (map[acc - targetSum]) cnt += map[acc - targetSum]
        if (map[acc]) map[acc]++
        else map[acc] = 1
        dfs(node.left, acc)
        dfs(node.right, acc)
        map[acc]--
    }

    dfs(root, 0)
    return cnt
};