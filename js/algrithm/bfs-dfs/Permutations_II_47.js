/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
    const ans = []
    const visited = Array(nums.length).fill(false)
    const dfs = function(level, path) {
        if (level === nums.length) {
            ans.push(path.slice())
        } else {
            for (let i = 0; i < nums.length; i++) {
                if (visited[i]) continue
                visited[i] = true
                path.push(nums[i])
                dfs(level + 1, path)
                path.pop()
                visited[i] = false
                while ( i < nums.length - 1 && nums[i] === nums[i + 1]) i++
            }
        }

    }
    nums.sort()
    dfs(0, [])
    return ans
};

const aa = [1, 1, 2]
const res = permuteUnique(aa)
console.log(res)