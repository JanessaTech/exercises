/**
 * // Definition for a _Node.
 * function _Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {_Node|null} root
 * @return {number[]}
 */
var postorder = function(root) {
    const ans = []
    const dfs = function(node) {
        if (!node) return
        for (const child of node.children) {
            if (child) {
                dfs(child)
            }
        }
        ans.push(node.val)
    }
    dfs(root)
    return ans
    
};