
 function TreeNode(val, left, right) {
     this.val = (val===undefined ? 0 : val)
      this.left = (left===undefined ? null : left)
      this.right = (right===undefined ? null : right)
  }

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
    const ret = isValid(root, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)
    return ret
};

function isValid(node, lo, hi ) {
    if (node === null) return true
    if (node.val <= lo || node.val >= hi) return false
    return isValid(node.left, lo, node.val) && isValid(node.right, node.val, hi)
}

const root = new TreeNode(0)
const res = isValidBST(root)
console.log(res)