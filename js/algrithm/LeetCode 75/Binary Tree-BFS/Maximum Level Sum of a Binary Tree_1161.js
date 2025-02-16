var maxLevelSum = function(root) {
    const queue = []
    if (root) queue.push(root)
    let level = 1
    let min = 1
    let max = -Infinity

    while (queue.length) {
        let size = queue.length
        let sum = 0
        for (let i = 0; i < size; i++) {
            const cur = queue.shift()
            sum += cur.val
            if (cur.left) queue.push(cur.left)
            if (cur.right) queue.push(cur.right)
        }
        if (sum > max) {
            max = sum
            min = level
        }
        sum = 0
        level++
    }

    return min
};