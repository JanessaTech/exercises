
var levelOrder = function(root, res = [], level = 0) {
    if (!root) return
    if (!res[level]) res[level] = []
    res[level].push(root.val)
    for (let child of root.children) {
        levelOrder(child, res, level + 1)
    }
    return res
}