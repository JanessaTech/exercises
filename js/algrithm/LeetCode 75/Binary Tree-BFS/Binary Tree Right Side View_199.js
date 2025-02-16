var rightSideView = function(root) {
    const view = []

    const queue = []
    if (root) queue.push(root)

    let level = 0
    while (queue.length) {
        const size = queue.length
        for (let i = 0; i < size; i++) {
            const cur = queue.shift()
            if (i === size - 1) view.push(cur.val)
            if (cur.left) queue.push(cur.left)
            if (cur.right) queue.push(cur.right)
        }
        level++
    }

    return view
};