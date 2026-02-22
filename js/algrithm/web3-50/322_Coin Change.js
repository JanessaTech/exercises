/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    coins.sort((a, b) => b - a)
    const n = coins.length
    const res = []
    const dfs = function(start, acc, path) {
        if (acc === amount) {
            if (res.length && res.length > path.length) {
                res[0] = path.slice()
            } else {
                res.push(path.slice())
            }
        } else {
            for (let i = start; i < n; i++) {
                if (acc + coins[i] > amount) continue
                path.push(coins[i])
                dfs(i, acc + coins[i], path)
                path.pop()
            }
        }
    }

    dfs(0, 0, [])
    return res
};

const coins = [186,419,83,408], amount = 6249
const res = coinChange(coins, amount)
console.log(res)