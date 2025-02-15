const pathSum = (root, targetSum) => {
	var cnt = 0
    const map = new Map([])
    const dfs = function(node, acc) {
        if (!node) return
        acc += node.val
        if (acc === targetSum) {
            cnt++;
        }
        if (map[acc - targetSum]) {
            cnt += map[acc - targetSum]
        }
        if (map[acc]) {
            map[acc]++
        } else {
            map[acc] = 1
        }
        dfs(node.left, acc)
        dfs(node.right, acc)
        map[acc]--
    }
    dfs(root, 0)
    return cnt
};

//check https://leetcode.com/problems/path-sum-iii/solutions/1745666/explanation-detailed-javascript-solution/