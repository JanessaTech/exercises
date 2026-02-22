/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let i = 0, n = prices.length, p = 0
    while (i < n - 1) {
         while (i < n - 1 && prices[i] >= prices[i + 1]) i++
         buy = prices[i]
         while (i < n - 1 && prices[i] < prices[i + 1]) i++
         sell = prices[i]
         p += (sell - buy)
    }
    return p
};