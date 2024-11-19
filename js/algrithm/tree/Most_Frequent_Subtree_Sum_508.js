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
 * @return {number[]}
 */
var findFrequentTreeSum = function(root) {
    const map = new Map([])
    const dfs = function(node) {
        if (!node) return 0
        const left = dfs(node.left)
        const right = dfs(node.right)
        const sum = node.val + left + right
        map.set(sum, (map.get(sum) || 0) + 1)
        return sum
    }
    dfs(root)
    const arr = [...map].sort((a, b) => b[1] - a[1])
    const res = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][1] === arr[0][1]) {
            res.push(arr[i][0])
        } else {
            break
        }
    }
    return res
    
};