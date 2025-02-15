var deleteNode = function(root, key) {
    if (root === null) return null
    if (root.val === key) {
        if (root.left === null && root.right === null) return null
        if (root.left !== null && root.right === null) return root.left
        if (root.left === null && root.right !== null) return root.right
        let leftMost = root.right
        while (leftMost.left !== null) leftMost = leftMost.left
        leftMost.left = root.left
        return root.right
    } else if (root.val > key) {
        root.left = deleteNode(root.left, key)
    } else {
        root.right = deleteNode(root.right, key)
    }
    return root
};