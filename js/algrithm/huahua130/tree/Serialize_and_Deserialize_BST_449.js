/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    if (!root) return 'null'
    return root.val + ',' + serialize(root.left) + ',' + serialize(root.right)
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    const path = data.split(',')
    const create = function(path) {
        const cur = path.shift()
        if (cur === 'null') return null
        const node = new TreeNode(parseInt(cur))
        node.left = create(path)
        node.right = create(path)
        return node
    }
    const root = create(path)
    return root
    
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */