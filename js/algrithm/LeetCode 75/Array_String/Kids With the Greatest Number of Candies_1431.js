var kidsWithCandies = function(candies, extraCandies) {
    let max = 0
    const ans = []
    for (let c of candies) {
        if (c > max) max = c
    }
    for (let c of candies) {
        if (c + extraCandies >= max) {
            ans.push(true)
        } else {
            ans.push(false)
        }
    }
    return ans
};