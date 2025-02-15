  
  function TreeNode(val) {
      this.val = val;
      this.left = this.right = null;
  }

/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} k
 * @return {number[]}
 */
var distanceK = function(root, target, k) {
    const parents = new Map()
    getParentsByDFS(root, parents)
    const queue = []
    const visited = new Set()
    queue.push(target)
    visited.add(target)

    let level = 0
    const ans = []

    while (queue.length) {
        const size = queue.length
        for (let i = 0; i < size; i++) {
            const cur = queue.shift()
            if (level === k) {
                ans.push(cur.val)
            } else {
                if (cur.left && !visited.has(cur.left)) {
                    queue.push(cur.left)
                    visited.add(cur.left)
                }
                if (cur.right && !visited.has(cur.right)) {
                    queue.push(cur.right)
                    visited.add(cur.right)
                }
                if (parents.has(cur) && !visited.has(parents.get(cur))) {
                    queue.push(parents.get(cur))
                    visited.add(parents.get(cur))
                }
            }
        }
        level++
    }

    return ans
};

function getParentsByDFS(node, map) {
    if (!node) return
    if (node.left) {
        map.set(node.left, node)
    }
    if (node.right) {
        map.set(node.right, node)
    }
    getParentsByDFS(node.left, map)
    getParentsByDFS(node.right, map)
}

const root = new TreeNode(1)
const target = root
const k = 3

const res = distanceK(root, target, k)
console.log(res)