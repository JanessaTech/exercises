var leafSimilar = function(root1, root2) {
    const dfs = function(node, seq) {
        if (!node) return
        if (node.left === null && node.right === null) {
            seq.push(node.val)
        }
        dfs(node.left, seq)
        dfs(node.right, seq)
    }

    const seq1 = []
    const seq2 = []
    dfs(root1, seq1)
    dfs(root2, seq2)
    if (seq1.length !== seq2.length) return false
    for (let i = 0; i < seq1.length; i++) {
        if (seq1[i] !== seq2[i]) return false
    }
    return true
};
