
var preorder = function(root) {
    const ans = []
    const dfs = function(node) {
        if (!node) return
        ans.push(node.val)
        for(let child of node.children) {
            dfs(child)
        }
    }
    dfs(root)
    return ans 
};